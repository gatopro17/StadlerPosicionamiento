require("dotenv").config({
  path: require("path").resolve(__dirname, "../../../.env"),
});

//importar los servicios
const BalizasService = require("../../../services/Balizas.Service");
const TrackerService = require("../../../services/Tracker.Service");
const TransbordadoresService = require("../../../services/Transbordadores.Service");

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
const cooldowns = new Map(); // Mapa para controlar los intervalos mínimos
const MIN_INTERVAL_MS = 1000; // mínimo 1 segundo entre mensajes del mismo tracker
client.on("message", async (topic, message) => {
  // Convierte el mensaje recibido (buffer) en un objeto JSON
  const data = JSON.parse(message.toString());
  // para manejar los transbordadores y su posicion.
  if (!data.trackerID || !Array.isArray(data.beacons)) return;

  const now = Date.now();
  const lastProcessed = cooldowns.get(data.trackerID) || 0;

  if (now - lastProcessed < MIN_INTERVAL_MS) {
    // Ignora este mensaje por llegar demasiado pronto
    return;
  }
  let acoplada = false;
  cooldowns.set(data.trackerID, now);
  //sacar las dos mayores intensidades de las que sean cabecera
  if (data.trackerID && Array.isArray(data.beacons)) {
    const balizasPlanas = Object.values(data.beacons[0]);

    const enrichedData = await Promise.all(
      balizasPlanas.map(async (baliza) => {
        try {
          if (baliza.id.startsWith("TRC1")) {
            acoplada = true;
            console.log("🔍 Buscando tracker con ID:", baliza.id);
            const dbBaliza = await BalizasService.findById(baliza.id);
            console.log(
              "🧲Transbordador ",
              data.trackerID,
              " acoplado con el transbordador TRC1"
            );
            // Actualiza la tabla de transbordadores
            updateData = {
              acoplado: "TRC1",
            };
            updateDataTRC1 = {
              acoplado: data.trackerID,
            };
            try {
              await TransbordadoresService.update(data.trackerID, updateData);
              await TransbordadoresService.update("TRC1", updateDataTRC1);
              console.log(
                "Transbordadores actualizados:",
                data.trackerID,
                "TRC1"
              );
            } catch (error) {
              console.error("Error actualizando el transbordador:", error);
            }
            const transbordadores = ["TRA1", "TRA2", "TRA3"];
            transbordadores.forEach((transbordador) => {
              if (transbordador !== data.trackerID) {
                updateData2 = {
                  acoplado: null,
                };
                try {
                  TransbordadoresService.update(transbordador, updateData2);
                  console.log(
                    "Borrando couples del Transbordador",
                    transbordador
                  );
                } catch (error) {
                  console.error(
                    "Error Borrando couples del Transbordador",
                    transbordador
                  );
                }
              }
            });

            return {
              ...baliza,
              tipo: dbBaliza?.tipo || "desconocido",
            };
          } else if (
            !baliza.id.startsWith("TRA") &&
            !baliza.id.startsWith("TRC1")
          ) {
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
    console.log(
      "DATA COMPLETAAAAA de lo que recibe el transbordador " + data.trackerID,
      JSON.stringify(filteredData, null, 2)
    );

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
    updateData4 = {
      via: topCabeceras[0].via,
    };
    try {
      await TransbordadoresService.update(data.trackerID, updateData4);
      console.log("Via del Transbordador actualizado:", data.trackerID);
    } catch (error) {
      console.error("Error actualizando el transbordador:", error);
    }
    if (!acoplada) {
      updateData3 = {
        acoplado: null,
      };
      try {
        await TransbordadoresService.update("TRC1", updateData3);
        console.log("Borrando columna acoplado del transbordador:", "TRC1");
      } catch (error) {
        console.error("Error actualizando el transbordador:", error);
      }
    } else {
      updateData3 = {
        via: topCabeceras[0].via,
      };
      await TransbordadoresService.update("TRC1", updateData3);
      console.log(
        "Via del transbordador TRC1 actualizado a:",
        topCabeceras[0].via
      );
    }
  }
});
