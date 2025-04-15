// Simulación de un caso de prueba para el tracker T-V12
// Este caso simula un tracker que ha pasado por el desvío 4 y está en la vía 12
const mqtt = require('mqtt');
const { inferTrackLocation } = require('../utils/AgujaProcessor');  

const client = mqtt.connect('mqtt://localhost:1883');

// Simulamos los datos del tracker
const message = {
  trackerId: 'T-V12',
  lastSwitchPassed: 4, // Último desvío pasado por el tracker
  switchStates: {
    1: 8,         // Desvío a vía 8
    2: 'continue', // Continúa
    3: 'continue', // Continúa
    4: 12       // Desvío a vía 12

  },
  signalMap: {
    11: -78,       // Señal para vía 11
    12: -85,       // Señal para vía 12
    10: -63,       // Señal para vía 10
  },
};

client.on('connect', () => {
  console.log('📤 Enviando caso: Tracker en vía 12');

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
