require("dotenv").config({
  path: require("path").resolve(__dirname, "../../../.env"),
});

const Activos = require("../../../models/Activos");
//importar los servicios
const BalizasService = require("../../../services/Balizas.Service");
const TransbordadoresService = require("../../../services/Transbordadores.Service");

// Importa la función que gestiona la conexión MQTT desde un archivo utilitario
const connectMQTT = require("../utils/mqttClient");

// Establece la conexión con el servidor MQTT utilizando la función `connectMQTT`
const client = connectMQTT();
// Evento que se ejecuta cuando la conexión con el broker MQTT es exitosa
client.on("connect", () => {
  // Muestra un mensaje indicando que el listener para los activos está conectado
  console.log("Transbordador listener connected");
  // Se suscribe al tema `position/asset` para recibir los mensajes relacionados con la posición de los activos
  client.subscribe("simulation/activoTransbordador");
});
// Evento que se ejecuta cuando se recibe un mensaje en el tema suscrito
const cooldowns = new Map(); // Mapa para controlar los intervalos mínimos
const MIN_INTERVAL_MS = 1000; // mínimo 1 segundo entre mensajes del mismo tracker
client.on("message", async (topic, message) => {
  // Convierte el mensaje recibido (buffer) en un objeto JSON
  const data = JSON.parse(message.toString());
  // para manejar los transbordadores y su posicion.

  const now = Date.now();
  const lastProcessed = cooldowns.get(data.trackerID) || 0;

  if (now - lastProcessed < MIN_INTERVAL_MS) {
    // Ignora este mensaje por llegar demasiado pronto
    return;
  }
  cooldowns.set(data.trackerID, now);
  const idActivo = data.id;
  if (data.id && Array.isArray(data.balizasRecibidas)) {
    const balizasPlanas = Object.values(data.balizasRecibidas[0]);
    const enrichedData = await Promise.all(
      balizasPlanas.map(async (baliza) => {
        try {
          const dbBaliza = await BalizasService.findById(baliza.id);
          return {
            ...baliza,
            via1: dbBaliza?.via1 || "0",
            via2: dbBaliza?.via2 || "0",
            tipo: dbBaliza?.tipo || "desconocido",
          };
        } catch (error) {
          console.error(
            `Error al buscar la baliza con ID ${baliza.id}: ${error}`
          );
          return null; // Retorna null en caso de error
        }
      })
    );
    // Elimina las que fallaron (null)
    const filteredData = enrichedData.filter(Boolean);
    console.log(
      "DATA COMPLETAAAAA de lo que recibe el transbordador " + data.trackerID,
      JSON.stringify(filteredData, null, 2)
    );
    //sacar las dos mayores intensidades
    const balizasRecibidas = filteredData
      .filter((baliza) => baliza.intensidad < 0)
      .sort((a, b) => b.intensidad - a.intensidad);
    const balizaMayor = balizasRecibidas[0];
    if (balizaMayor.tipo == "Transbordador") {
      const Transbordadordb = await TransbordadoresService.findByField(
        "id",
        balizaMayor.via1
      );
      updateData = {
        posible_via: Transbordadordb.via1,
        posible_via2: Transbordadordb.via2,
      };
      await ActivosService.update(idActivo, updateData);
    }
  }
});
