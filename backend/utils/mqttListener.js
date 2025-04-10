require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
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
    console.log('Mensaje recibido', mensajeString);  // Imprimir para verificar

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
    // Verificamos si la baliza ya existe en el buffer
    const existeBaliza = bufferBalizas[trackerId].some(baliza => baliza.id === id);
    if (!existeBaliza) {
      // Añadimos la nueva baliza al array si no está duplicada
      bufferBalizas[trackerId].push({ id, nombre, mayor, minor, intensidad, trackerId });
    } else {
      console.log(`Baliza ${id} ya registrada para el tracker ${trackerId}`);
    }

   
    // Limitar las balizas    
    const maxBalizas = 5;
    if (bufferBalizas[trackerId].length > maxBalizas) {
      bufferBalizas[trackerId].shift(); // Elimina la baliza más antigua si excede el límite
    }

  } catch (error) {
    console.error('Error al procesar mensaje MQTT:', error);
  }
});

setInterval(() => {
  for (const trackerId in bufferBalizas) {
    const balizas = bufferBalizas[trackerId];

    // Verificamos si tenemos al menos una baliza para procesar
    if (balizas.length > 0) {
      // Pasamos el conjunto de balizas cercanas al controlador para que lo maneje
      manejarMensajeTracker({
        trackerId,  // ID del tracker
        balizasCercanas: balizas  // Las últimas balizas registradas
      });

      // Limpiar el buffer después de procesar las balizas
      bufferBalizas[trackerId] = [];
      console.log(`Buffer para tracker ${trackerId} limpiado después de procesar las balizas.`);
    } else {
      console.log(`No hay balizas para procesar en el buffer del tracker ${trackerId}`);
    }
  }
}, 60000);  // Cada 1 minuto