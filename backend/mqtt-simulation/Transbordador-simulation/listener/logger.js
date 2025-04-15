// Importa la función que gestiona la conexión MQTT desde un archivo utilitario
const connectMQTT = require('../utils/mqttClient');

// Importa el módulo `processor` que procesará los mensajes recibidos
const processor = require('../utils/processor');

// Establece la conexión con el servidor MQTT utilizando la función `connectMQTT`
const client = connectMQTT();

// Evento que se ejecuta cuando la conexión con el broker MQTT es exitosa
client.on('connect', () => {
  // Muestra un mensaje indicando que el logger está conectado
  console.log('Logger connected');

  // Se suscribe al tema `position/#` para recibir todos los mensajes relacionados con las posiciones
  client.subscribe('position/#');
});

// Evento que se ejecuta cuando se recibe un mensaje en el tema suscrito
client.on('message', (topic, message) => {
  // Convierte el mensaje recibido (buffer) en un objeto JSON
  const data = JSON.parse(message.toString());

  // Muestra en la consola el tema y los datos del mensaje recibido
  console.log(`[LOG] Topic: ${topic}, Payload:`, data);

  // Verifica si el mensaje proviene de un tracker o un activo y lo procesa de acuerdo con ello
  if (topic.includes('tracker')) {
    // Si el tema contiene la palabra "tracker", procesa el mensaje como un tracker
    processor.processMessage(data, 'tracker');
  } else if (topic.includes('asset')) {
    // Si el tema contiene la palabra "asset", procesa el mensaje como un activo
    processor.processMessage(data, 'asset');
  }
});
