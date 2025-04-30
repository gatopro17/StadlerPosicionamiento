// Importa la función de conexión MQTT desde un archivo utilitario
const connectMQTT = require('../utils/mqttClient');
// Importa una función para generar una intensidad de señal aleatoria
const getRandomIntensity = require('../utils/randomIntensity');
// Importa las funciones para generar balizas específicas para los trackers
const { generateCabeceraBeacon, generateTransbordadorBeacon } = require('../utils/balizaHelper');

// Establece la conexión con el servidor MQTT utilizando la función `connectMQTT`
const client = connectMQTT();
// Función para crear el payload (mensaje) que se enviará por MQTT
// Toma un tracker, beacon, rail y position y genera un mensaje con los datos relevantes
const getRandomOtherTrackerID = (currentTrackerID) => {
  const otherTrackers = trackers
    .filter(t => `${t.prefix}-${t.id}` !== currentTrackerID && t.prefix === 'T'); // Solo transbordadores
  const random = otherTrackers[Math.floor(Math.random() * otherTrackers.length)];
  return `${random.prefix}-${random.id}`;
};

const createTrackerPayload = (tracker, beacon, rail, position) => ({
  trackerID: `${tracker.prefix}-${tracker.id}`,  // ID único del tracker
  trackerName: tracker.nombre,                   // Nombre del tracker
  beaconId: getRandomOtherTrackerID(tracker.id),                       // ID de la baliza
  rail: rail,                           // El rail en el que se encuentra el tracker
  position: position,               // La posición dentro del rail
  rssi: getRandomIntensity()     // Intensidad de la señal (RSSI), generada aleatoriamente
});

// Configuración de los trackers (activos y transbordadores)
const trackers = [
  {
    id: 2,
    nombre: "Activo A2",
    prefix: "A",
    interval: 70000,
    generateBeacon: () => {
      // Genera un rail y una posición aleatoria para el activo
      const rail = Math.floor(Math.random() * 7) + 1;
      const position = Math.floor(Math.random() * 22) + 1;
      return {
        id: `R${rail}-P${position}`,  // opcional, por trazabilidad
        mayor: rail,
        minor: position,
        rail,
        position
      };
    },
    topic: 'position/asset'  // Tema MQTT en el que se publicarán los datos de este tracker
  },
  
  {
    id: 1,
    nombre: "Activo 1",
    prefix: "A",
    interval: 60000,
    generateBeacon: () => generateTransbordadorBeacon(1),
    topic: 'position/asset'
  },
  {
    id: 3,
    nombre: "Transbordador Pequeño",
    prefix: "T",
    interval: 50000,
    generateBeacon: () => generateCabeceraBeacon(Math.floor(Math.random() * 7) + 1),
    topic: 'position/tracker'
  },
  {
    id: 2,
    nombre: "Transbordador Mediano",
    prefix: "T",
    interval: 70000,
    generateBeacon: () => generateCabeceraBeacon(Math.floor(Math.random() * 7) + 1),
    topic: 'position/tracker'
  },
  {
    id: 1,
    nombre: "Transbordador Grande",
    prefix: "T",
    interval: 60000,
    generateBeacon: () => [1, 2, 3].map(rail => generateCabeceraBeacon(rail)),
    topic: 'position/tracker'
  }
];
// Evento cuando se establece la conexión con el broker MQTT
client.on('connect', () => {
  console.log('Connected to MQTT Broker');

  // Para cada tracker, se ejecuta un intervalo para publicar los datos
  trackers.forEach(tracker => {
    setInterval(() => {
      const beacons = tracker.generateBeacon();
      const beaconArray = Array.isArray(beacons) ? beacons : [beacons];   // Asegura que las balizas sean un array

      beaconArray.forEach(beacon => {
        const payload = createTrackerPayload(tracker, beacon, beacon.mayor, beacon.minor);

               // Si el tracker es "Activo 1", simulado como montado en transbordador, no se incluye el rail en el payload
        if (tracker.id === 1 && tracker.prefix === 'A') {
          delete payload.rail;
        }

        client.publish(tracker.topic, JSON.stringify(payload));
      });
    }, tracker.interval);
  });
});
