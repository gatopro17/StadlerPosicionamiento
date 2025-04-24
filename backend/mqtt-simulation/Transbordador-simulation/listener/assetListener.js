require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

// Importa la función que gestiona la conexión MQTT desde un archivo utilitario
const connectMQTT = require('../utils/mqttClient');
// Importa el módulo `processor` que procesará los mensajes recibidos
const processor = require('../utils/processor');
// Establece la conexión con el servidor MQTT utilizando la función `connectMQTT`
const client = connectMQTT();
// Evento que se ejecuta cuando la conexión con el broker MQTT es exitosa
client.on('connect', () => {
   // Muestra un mensaje indicando que el listener para los activos está conectado
  console.log('Asset listener connected');
   // Se suscribe al tema `position/asset` para recibir los mensajes relacionados con la posición de los activos
  client.subscribe('position/asset');
});
// Evento que se ejecuta cuando se recibe un mensaje en el tema suscrito
client.on('message', (topic, message) => {
    // Convierte el mensaje recibido (buffer) en un objeto JSON
  const data = JSON.parse(message.toString());
 // Determina la fuente del mensaje, ya sea un beacon o un rail (vía)
  const source = data.beaconId
    ? `From Beacon ${data.beaconId}` // Si el mensaje tiene un beaconId, la fuente es una baliza
    : data.rail !== undefined        // Si el mensaje tiene un número de rail (vía), la fuente es un rail
      ? `From Rail ${data.rail}`   // Si tiene rail, lo muestra
      : 'Unknown source';   // Si no hay beaconId ni rail, la fuente es desconocida

        // Muestra en la consola los detalles del activo recibido: ID, fuente y RSSI (intensidad de señal)
  console.log(`[ASSET] ID: ${data.trackerID}, ${source}, RSSI: ${data.rssi}`);

  processor.processMessage(data, 'asset');
});