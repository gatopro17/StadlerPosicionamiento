// Importa la función que gestiona la conexión MQTT desde un archivo utilitario
const connectMQTT = require('../utils/mqttClient');

// Importa el módulo `processor` que procesará los mensajes recibidos
const processor = require('../utils/processor');

// Establece la conexión con el servidor MQTT utilizando la función `connectMQTT`
const client = connectMQTT();

// Evento que se ejecuta cuando la conexión con el broker MQTT es exitosa
client.on('connect', () => {
  // Muestra un mensaje indicando que el listener de tracker está conectado
  console.log('Tracker listener connected');

  // Se suscribe al tema `position/tracker` para recibir los mensajes relacionados con la posición del tracker
  client.subscribe('position/tracker');
});

// Evento que se ejecuta cuando se recibe un mensaje en el tema suscrito
client.on('message', (topic, message) => {
  // Convierte el mensaje recibido (buffer) en un objeto JSON
  const data = JSON.parse(message.toString());

  // Muestra en la consola el ID del tracker, su nombre, riel y la intensidad de la señal RSSI
  console.log(`[TRACKER] ID: ${data.trackerID}, Name: ${data.trackerName}, Rail: ${data.rail}, RSSI: ${data.rssi}`);

  // Procesa el mensaje del tracker utilizando el módulo `processor` para manejar los datos
  processor.processMessage(data, 'tracker');
});
