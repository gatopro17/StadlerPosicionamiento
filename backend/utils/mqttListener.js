require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

console.log('DB User:', process.env.DB_USER);  // Verificar si se carga correctamente
console.log('DB Password:', process.env.DB_PASSWORD); 
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const { manejarMensajeTracker } = require('../controllers/Tracker.Controller');

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
    // Convertir el Buffer en una cadena antes de intentar parsearla
    const mensajeString = message.toString(); // Convertir a string
    console.log('Mensaje convertido a string:', mensajeString);  // Imprimir para verificar

    // Ahora podemos parsear el mensaje a un objeto JSON
    const baliza = JSON.parse(mensajeString);
    // Ahora cada baliza tiene la información completa, incluyendo nombre, mayor, minor, intensidad, trackerId
    const { id, nombre, mayor, minor, intensidad, trackerId } = baliza;

    if (!trackerId) {
      throw new Error('El mensaje recibido no contiene un trackerId válido.');
    }
    // Comprobamos si ya tenemos un array de balizas para este trackerId
    if (!bufferBalizas[trackerId]) {
      bufferBalizas[trackerId] = [];
    }

    // Añadimos la nueva baliza al array
    bufferBalizas[trackerId].push({ id, nombre, mayor, minor, intensidad, trackerId });

    // Limitar a las últimas 5 balizas por tracker
    if (bufferBalizas[trackerId].length > 5) {
      bufferBalizas[trackerId].shift(); // Elimina la baliza más antigua
    }

  } catch (error) {
    console.error('Error al procesar mensaje MQTT:', error);
  }
});

// 
setInterval(() => {
  for (const trackerId in bufferBalizas) {
    const balizas = bufferBalizas[trackerId];
 //   console.log(`Procesando balizas para el tracker ${trackerId}:`, balizas);
    // Pasamos el conjunto de balizas cercanas al controlador para que lo maneje
    manejarMensajeTracker({
      trackerId,  // ID del tracker
      balizasCercanas: balizas  // Las últimas balizas registradas
    });
  }
}, 60000);  
