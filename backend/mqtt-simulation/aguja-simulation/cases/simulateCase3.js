// Simulación de un caso de prueba para el tracker T-V14
// Este caso simula un tracker que ha pasado por el desvío 5 y está en la vía 14
const mqtt = require('mqtt');
const { inferTrackLocation } = require('../utils/AgujaProcessor');  // Asegúrate de que la ruta sea correcta

const client = mqtt.connect('mqtt://localhost:1883');

const message = {
  trackerId: 'T-V14',
  lastSwitchPassed: 5,
  switchStates: {
    1: 8,         // Desvío a vía 8
    2: 'continue', // Continúa
    3: 'continue', // Continúa
    4: 'continue', // Continúa
    5: 14,         // Desvío a vía 14
  },
  signalMap: {
    13: -82,       // Señal para vía 13
    14: -58,       // Señal para vía 14
  },
};

client.on('connect', () => {
  console.log('📤 Enviando caso: Tracker en vía 14');

  // Usamos la función inferTrackLocation para determinar la vía
  const inferredTrack = inferTrackLocation(message.signalMap, message.switchStates, message.lastSwitchPassed);

  if (inferredTrack !== null) {
    console.log(`✅ La vía inferida para el tracker ${message.trackerId} es la vía ${inferredTrack}`);
    message.inferredTrack = inferredTrack; // Añadimos la vía inferida al mensaje
  } else {
    console.log('❌ No se pudo inferir la vía');
    message.inferredTrack = 'indeterminado'; // En caso de no poder determinar la vía
  }

  // Publicamos el mensaje con la vía inferida
  client.publish('simulation/tracker', JSON.stringify(message), {}, () => {
    console.log('✅ Mensaje enviado');
    client.end();
  });
});
