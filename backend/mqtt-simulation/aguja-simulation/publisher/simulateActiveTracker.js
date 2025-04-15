const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://localhost:1883');

// 🧪 Simulación de un mensaje que representa la posición y contexto de un tracker
const message = {
  trackerId: 'T-01',
  lastSwitchPassed: 3,  // Último desvío por el que pasó el tracker
  switchStates: {  // Mapeo del estado de los desvíos (ej: si el desvío 3 va hacia la vía 10)
    1: 2,
    2: 3,
    3: 10, // // En este caso, el desvío 3 lleva a la vía 10
    5: 13,
  },
  signalMap: { // Intensidad de señales detectadas desde diferentes balizas (cuanto más cercano, mayor intensidad)
    9: -80,   
    10: -60,    // Señal más fuerte → probablemente más cerca de esta baliza
    11: -75,
  },
};

client.on('connect', () => {
  console.log('📤 Publisher connected');
  client.publish('simulation/tracker', JSON.stringify(message), {}, () => {
    console.log('✅ Mensaje enviado');
    client.end();
  });
});
