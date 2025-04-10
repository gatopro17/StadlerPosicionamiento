require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const { manejarMensajeTracker } = require('../controllers/Tracker.Controller');

const bufferBalizas = {}; // { trackerId: [baliza1, baliza2, ...] }
const ultimaActualizacion = {}; // { trackerId: timestamp }

client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  client.subscribe('baliza/gps/#', (err) => {    if (!err) {
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
    // Guardar la hora de la última actualización
    ultimaActualizacion[trackerId] = Date.now();

  } catch (error) {
    console.error('Error al procesar mensaje MQTT:', error);
  }
});

setInterval(() => {
  const now = Date.now();
  for (const trackerId in bufferBalizas) {
    const balizas = bufferBalizas[trackerId];
    const lastUpdated =  ultimaActualizacion[trackerId] || 0;
    const  hanPasado20s = now - lastUpdated > 20000;

    if (balizas.length >= 5 || hanPasado20s) {
      manejarMensajeTracker({
        trackerId,
        balizasCercanas: balizas
      });

      delete bufferBalizas[trackerId];
      delete ultimaActualizacion[trackerId];
    } else {
      console.log(`Procesando balizas en el buffer del tracker ${trackerId}`);
    }
  }
}, 20000);  // Cada 20 segundos