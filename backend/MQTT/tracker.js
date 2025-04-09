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

  // Aquí puedes acceder a los campos de los datos de la baliza
  const { id, nombre, mayor, minor, intensidad, trackerId } = datosBaliza;

 
  
  // Ejemplo de log con más detalle
  console.log(`Nombre de la baliza: ${nombre}`);
  console.log(`ID de la baliza: ${id}`);
  console.log(`Posición de la baliza: Rail ${mayor}, Posición ${minor}`);
  console.log(`Intensidad de la señal: ${intensidad}`);
  console.log(`ID del Tracker: ${trackerId}`);
  
 
});
