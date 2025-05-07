require("dotenv").config({
  path: require("path").resolve(__dirname, "../../../.env"),
});

//importar los servicios
const BalizasService = require("../../../services/Balizas.Service");
const TrackerService = require("../../../services/Tracker.Service");

// Importa la función que gestiona la conexión MQTT desde un archivo utilitario
const connectMQTT = require("../utils/mqttClient");
// Importa el módulo `processor` que procesará los mensajes recibidos
const processor = require("../utils/processor");
// Establece la conexión con el servidor MQTT utilizando la función `connectMQTT`
const client = connectMQTT();
// Evento que se ejecuta cuando la conexión con el broker MQTT es exitosa
client.on("connect", () => {
  // Muestra un mensaje indicando que el listener para los activos está conectado
  console.log("Transbordador listener connected");
  // Se suscribe al tema `position/asset` para recibir los mensajes relacionados con la posición de los activos
  client.subscribe("position/transbordador");
});
// Evento que se ejecuta cuando se recibe un mensaje en el tema suscrito
client.on("message", async (topic, message) => {
  // Convierte el mensaje recibido (buffer) en un objeto JSON
  const data = JSON.parse(message.toString());
  // para manejar los transbordadores y su posicion.

  //sacar las dos mayores intensidades de las que sean cabecera
  if (Array.isArray(data)) {
    const balizasPlanas = Object.values(data[0]);

    const enrichedData = await Promise.all(
      balizasPlanas.map(async (baliza) => {
        try {
          if (baliza.id === "TTRC1") {
            console.log("🔍 Buscando tracker con ID:", baliza.id);
            const dbBaliza = await TrackerService.findById(baliza.id);
            console.log(
              "🧲Transbordador acoplado con el transbordador con tracker:",
              baliza.id
            );
            return {
              ...baliza,
              tipo: dbBaliza?.tipo || "desconocido",
            };
          } else if (baliza.id.startsWith("TTRA")) {
            console.log("🔍 Buscando tracker con ID:", baliza.id);
            const dbBaliza = await TrackerService.findById(baliza.id);
            return {
              ...baliza,
              tipo: dbBaliza?.tipo || "desconocido",
            };
          } else {
            console.log("🔍 Buscando baliza con ID:", baliza.id);
            const dbBaliza = await BalizasService.findById(baliza.id);
            return {
              ...baliza,
              tipo: dbBaliza?.tipo || "desconocido",
              via: dbBaliza?.via || "desconocida",
            };
          }
        } catch (error) {
          console.error(
            `❌ No se encontró la baliza con ID ${baliza.id}:`,
            error
          );
          return null; // puedes elegir si devolver null, baliza original, o descartarla
        }
      })
    );

    // Elimina las que fallaron (null)
    const filteredData = enrichedData.filter(Boolean);
    // Ahora `enrichedData` contiene todas las balizas con el campo `tipo`
    console.log("DATA COMPLETAAAAA", JSON.stringify(filteredData, null, 2));

    // filtrar cabeceras y sacar las dos con mayor intensidad
    const cabeceras = filteredData.filter((b) => b.tipo === "Cabecera");
    const topCabeceras = cabeceras
      .sort((a, b) => b.intensidad - a.intensidad)
      .slice(0, 2);
    //si las dos cabeceras tienen la misma via, se muestra la via por consola, si no, se muestra la que mayor intensidad tiene
    if (topCabeceras[0].via === topCabeceras[1].via) {
      console.log("🚂 Transbordador en la vía:", topCabeceras[0].via);
    } else {
      console.log("🚂 Transbordador en la vía:", topCabeceras[0].via);
    }

    processor.processMessage(data);
  }
});
