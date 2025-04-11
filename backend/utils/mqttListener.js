require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const { manejarMensajeTracker } = require('../controllers/Tracker.Controller');

const bufferBalizas = {}; // { trackerId: [baliza1, baliza2, ...] }
const ultimaActualizacion = {}; // { trackerId: timestamp }
/**
 * Conexión y suscripción al broker MQTT.
 * Al conectarse, el cliente se suscribe al tópico 'baliza/gps/#' y empieza a recibir mensajes.
 */
client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  client.subscribe('baliza/gps/#', (err) => {    if (!err) {
      console.log('Suscrito a baliza/gps/#');
    } else {
      console.error('Error al suscribirse:', err);
    }
  });
});

/**
 * Maneja los mensajes recibidos por MQTT.
 * 
 * Cada mensaje recibido se procesa como un objeto JSON que contiene los datos de una baliza.
 * Se verifica la existencia del `trackerId` y se agrega la baliza al buffer correspondiente.
 * Si se excede el límite de balizas, la baliza más antigua se elimina del buffer.
 * 
 * @param {string} topic - El tópico del mensaje recibido.
 * @param {Buffer} message - El mensaje recibido, que se convierte a un objeto JSON.
 */
client.on('message', (topic, message) => {
  try {
    // Convertir el Buffer en una cadena antes de intentar parsearla
    const mensajeString = message.toString(); // Convertir a string
    console.log('Mensaje recibido', mensajeString);  // Imprimir para verificar

   // Parsear el mensaje JSON
    const baliza = JSON.parse(mensajeString);
   // Comprobar que el mensaje contiene los campos necesarios
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

/**
 * Intervalo que se ejecuta cada 20 segundos para procesar las balizas almacenadas en el buffer.
 * Si un tracker tiene al menos 5 balizas o han pasado más de 20 segundos desde la última actualización, 
 * se envía la información de las balizas al controlador `manejarMensajeTracker` para su procesamiento.
 */
setInterval(() => {
  const now = Date.now();
  for (const trackerId in bufferBalizas) {
    const balizas = bufferBalizas[trackerId];
    const lastUpdated =  ultimaActualizacion[trackerId] || 0;
    const  hanPasado20s = now - lastUpdated > 20000;
 // Si hay al menos 5 balizas o han pasado más de 20 segundos desde la última actualización
    if (balizas.length >= 5 || hanPasado20s) {
      manejarMensajeTracker({
        trackerId,
        balizasCercanas: balizas
      });
 // Limpiamos los buffers de balizas y la última actualización después de procesar
      delete bufferBalizas[trackerId];
      delete ultimaActualizacion[trackerId];
    } else {
      console.log(`Procesando balizas en el buffer del tracker ${trackerId}`);
    }
  }
}, 20000);  // Cada 20 segundos