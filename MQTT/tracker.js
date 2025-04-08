const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost'); // Conectar al broker MQTT

// Suscripción a los datos de las balizas
client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  client.subscribe('baliza/gps/#', (err) => {  // Suscribirse a todos los tópicos de balizas
    if (!err) {
      console.log('Suscrito a los tópicos de las balizas');
    } else {
      console.log('Error al suscribirse');
    }
  });
});

// Procesamiento de los datos recibidos de las balizas
client.on('message', (topic, message) => {
  const datosBaliza = JSON.parse(message.toString());
  console.log(`Datos recibidos de ${topic}:`, datosBaliza);

 
});
