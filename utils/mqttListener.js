const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const { manejarMensajeTracker } = require('./controllers/tracker.controller');

const bufferBalizas = {}; // { trackerId: [baliza1, baliza2, ...] }

client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  client.subscribe('baliza/gps/#', (err) => {
    if (!err) {
      console.log('Suscrito a baliza/gps/#');
    } else {
      console.error('Error al suscribirse:', err);
    }
  });
});

client.on('message', (topic, message) => {
  try {
    const baliza = JSON.parse(message.toString());
    const trackerId = baliza.id;

    if (!bufferBalizas[trackerId]) {
      bufferBalizas[trackerId] = [];
    }

    // Añadir la nueva baliza
    bufferBalizas[trackerId].push(baliza);

    // Limitar a las últimas 5 balizas por tracker
    if (bufferBalizas[trackerId].length > 5) {
      bufferBalizas[trackerId].shift();
    }

  } catch (error) {
    console.error('Error al procesar mensaje MQTT:', error);
  }
});

// Cada 5 segundos, procesamos las balizas acumuladas
setInterval(() => {
  for (const trackerId in bufferBalizas) {
    const balizas = bufferBalizas[trackerId];

    manejarMensajeTracker(JSON.stringify({
      id: trackerId,
      balizasCercanas: balizas
    }));
  }
}, 5000);
