// Importa la librería MQTT para conectar y manejar mensajes del broker
const mqtt = require('mqtt');
// Importa la función que infiere en qué vía está el tracker, según señales y desvíos
const { inferTrackLocation } = require('../utils/AgujaProcessor.js');
// Conexión al broker MQTT en localhost, puerto 1883
const client = mqtt.connect('mqtt://localhost:1883');
// Evento cuando la conexión con el broker MQTT se establece correctamente
client.on('connect', () => {
  console.log('📥 Listener connected');
    // Se suscribe al topic 'simulation/tracker' para recibir mensajes simulados de trackers
  client.subscribe('simulation/tracker');
});
// Evento que se dispara al recibir un mensaje del topic suscrito
client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
 // Extrae los campos relevantes del mensaje
  const {
    trackerId,
    lastSwitchPassed, // Último desvío pasado por el tracker
    switchStates,// Estados de los desvíos (1 a 5) y su respectiva vía o acción
    signalMap, // Mapa de señales para diferentes vías
  } = data;
  
  // Llama a la función que infiere la vía probable del tracker con base en la información recibida
  const result = inferTrackLocation(signalMap, switchStates, lastSwitchPassed);

  console.log(`📍 Tracker ${trackerId} probable position: vía ${result}`);
});
