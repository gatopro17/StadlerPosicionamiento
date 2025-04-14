const connectMQTT = require('../utils/mqttClient');
const getRandomIntensity = require('../utils/randomIntensity');
const { generateCabeceraBeacon, generateTransbordadorBeacon } = require('../utils/balizaHelper');

// Conexión MQTT (solo una vez)
const client = connectMQTT();

const createTrackerPayload = (tracker, beacon, rail, position) => ({
  trackerID: `${tracker.prefix}-${tracker.id}`,
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
    prefix: "A",
    interval: 7000,
    generateBeacon: () => {
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
    topic: 'position/asset'
  },
  {
    id: 1,
    nombre: "Activo 1",
    prefix: "A",
    interval: 5000,
    generateBeacon: () => generateTransbordadorBeacon(1),
    topic: 'position/asset'
  },
  {
    id: 3,
    nombre: "Transbordador Pequeño",
    prefix: "T",
    interval: 4000,
    generateBeacon: () => generateCabeceraBeacon(Math.floor(Math.random() * 7) + 1),
    topic: 'position/tracker'
  },
  {
    id: 2,
    nombre: "Transbordador Mediano",
    prefix: "T",
    interval: 6000,
    generateBeacon: () => generateCabeceraBeacon(Math.floor(Math.random() * 7) + 1),
    topic: 'position/tracker'
  },
  {
    id: 1,
    nombre: "Transbordador Grande",
    prefix: "T",
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
      const beacons = tracker.generateBeacon();
      const beaconArray = Array.isArray(beacons) ? beacons : [beacons];

      beaconArray.forEach(beacon => {
        const payload = createTrackerPayload(tracker, beacon, beacon.mayor, beacon.minor);

        // Si es "Activo 1" simulado como montado en transbordador, no debe tener rail
        if (tracker.id === 1 && tracker.prefix === 'A') {
          delete payload.rail;
        }

        client.publish(tracker.topic, JSON.stringify(payload));
      });
    }, tracker.interval);
  });
});
