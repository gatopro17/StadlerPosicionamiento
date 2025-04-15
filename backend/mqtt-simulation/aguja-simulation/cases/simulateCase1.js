// Simulación de un caso de prueba para el módulo de Aguja
// Este caso simula un tracker que ha pasado por el desvío 2 y está en la vía 9
const mqtt = require('mqtt');
const { inferTrackLocation } = require('../utils/AgujaProcessor'); 

const client = mqtt.connect('mqtt://localhost:1883');

// Simulamos los datos del tracker
const message = {
  trackerId: 'T-V9',
  lastSwitchPassed: 2,
  switchStates: {
    1: 8,        // Desvío a vía 8
    2: 9,        // Desvío a vía 9
    3: 'continue',  // Continua
    4: 11,       // Otras agujas
    5: 13,
  },
  signalMap: {
    8: -85,      // Señal para vía 8
    9: -60,      // Señal para vía 9
    10: -75,     // Señal para vía 10
  },
};

client.on('connect', () => {
  console.log('📤 Enviando caso: Tracker en vía 9');

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
