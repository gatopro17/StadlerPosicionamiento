const connectMQTT = require('../utils/mqttClient');
const getRandomIntensity = require('../utils/randomIntensity');
const { generateCabeceraBeacon, generateTransbordadorBeacon } = require('../utils/balizaHelper');

// Conexión MQTT (solo una vez)
const client = connectMQTT();

const createTrackerPayload = (tracker, beacon, rail, position) => ({
  trackerID: tracker.id,
  trackerName: tracker.nombre,
  beaconId: beacon.id,
  rail: rail,
  position: position,
  rssi: getRandomIntensity()
});

// Configuración de los trackers
const trackers = [
  {
    id: 2,
    nombre: "Activo A2",
    interval: 7000,
    generateBeacon: () => ({
      rail: Math.floor(Math.random() * 7) + 1,
      position: Math.floor(Math.random() * 22) + 1
    }),
    topic: 'position/asset'
  },
  {
    id: 1,
    nombre: "Activo 1",
    interval: 5000,
    generateBeacon: () => generateTransbordadorBeacon(1),
    topic: 'position/asset'
  },
  {
    id: 4,
    nombre: "Transbordador Pequeño",
    interval: 4000,
    generateBeacon: () => generateCabeceraBeacon(Math.floor(Math.random() * 7) + 1),
    topic: 'position/tracker'
  },
  {
    id: 3,
    nombre: "Transbordador Mediano",
    interval: 6000,
    generateBeacon: () => generateCabeceraBeacon(Math.floor(Math.random() * 7) + 1),
    topic: 'position/tracker'
  },
  {
    id: 2,
    nombre: "Transbordador Grande",
    interval: 5000,
    generateBeacon: () => [1, 2, 3].map(rail => generateCabeceraBeacon(rail)),
    topic: 'position/tracker'
  }
];

client.on('connect', () => {
  console.log('Connected to MQTT Broker');

  // Publicar payload para cada tracker
  trackers.forEach(tracker => {
    setInterval(() => {
      const beacon = tracker.generateBeacon();
      if (Array.isArray(beacon)) {
        // Para el caso de transbordador grande que simula múltiples beacons
        beacon.forEach(b => {
          const payload = createTrackerPayload(tracker, b, b.mayor, b.minor);
          client.publish(tracker.topic, JSON.stringify(payload));
        });
      } else {
        const payload = createTrackerPayload(tracker, beacon, beacon.mayor, beacon.minor);
        client.publish(tracker.topic, JSON.stringify(payload));
      }
    }, tracker.interval);
  });
});
