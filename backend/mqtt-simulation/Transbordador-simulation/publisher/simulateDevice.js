// Importa la función de conexión MQTT desde un archivo utilitario
const connectMQTT = require("../utils/mqttClient");
// Importa una función para generar una intensidad de señal aleatoria
const getRandomIntensity = require("../utils/randomIntensity");
// Importa las funciones para generar balizas específicas para los trackers
const {
  generateAcopladoBeacon,
  generateCabeceraBeacon,
  generateTransbordadorBeacon,
} = require("../utils/balizaHelper");

// Establece la conexión con el servidor MQTT utilizando la función `connectMQTT`
const client = connectMQTT();
// Función para crear el payload (mensaje) que se enviará por MQTT
// Toma un tracker, beacon, rails y position y genera un mensaje con los datos relevantes
const getRandomOtherTrackerID = (currentTrackerID) => {
  const otherTrackers = trackers.filter(
    (t) => `${t.prefix}-${t.id}` !== currentTrackerID && t.prefix === "T"
  ); // Solo transbordadores
  const random =
    otherTrackers[Math.floor(Math.random() * otherTrackers.length)];
  return `${random.prefix}-${random.id}`;
};

const createTrackerPayload = (tracker, beacon, rails, position) => ({
  trackerID: `${tracker.prefix}-${tracker.id}`, // ID único del tracker
  trackerName: tracker.nombre, // Nombre del tracker
  beaconId: getRandomOtherTrackerID(tracker.id), // ID de la baliza
  rails: rails, // El rails en el que se encuentra el tracker
  position: position, // La posición dentro del rails
  rssi: getRandomIntensity(), // Intensidad de la señal (RSSI), generada aleatoriamente
});

// Configuración de los trackers (activos y transbordadores)
const trackers = [
  {
    id: 2,
    nombre: "Activo A2",
    prefix: "A",
    interval: 20000,
    generateBeacon: () => {
      // Genera un rails y una posición aleatoria para el activo
      const rails = Math.floor(Math.random() * 7) + 1;
      const position = Math.floor(Math.random() * 22) + 1;
      return {
        id: `R${rails}-P${position}`, // opcional, por trazabilidad
        via: rails,
        minor: position,
        rails,
        position,
      };
    },
    topic: "position/asset", // Tema MQTT en el que se publicarán los datos de este tracker
  },

  {
    id: 1,
    nombre: "Activo 1",
    prefix: "A",
    interval: 10000,
    generateBeacon: () => generateTransbordadorBeacon(1),
    topic: "position/asset",
  },
  {
    id: "TRC1",
    nombre: "Transbordador Acoplado",
    prefix: "TC",
    interval: 10000,
    generateBeacon: () => generateCabeceraBeacon(),
    topic: "position/transbordadorC",
  },
  {
    id: "TRA1",
    nombre: "Transbordador Autonomo",
    prefix: "T",
    interval: 10000,
    generateBeacon: () => generateAcopladoBeacon(),
    topic: "position/transbordador",
  },
  {
    id: "TRA2",
    nombre: "Transbordador Autonomo",
    prefix: "T",
    interval: 10000,
    generateBeacon: () => generateAcopladoBeacon(),
    topic: "position/transbordador",
  },
  {
    id: "TRA3",
    nombre: "Transbordador Autonomo",
    prefix: "T",
    interval: 10000,
    generateBeacon: () => generateAcopladoBeacon(),
    topic: "position/transbordador",
  },
];
// Evento cuando se establece la conexión con el broker MQTT
client.on("connect", () => {
  const transbordadores = trackers.filter(
    (t) => t.topic === "position/transbordador"
  );

  transbordadores.forEach((tracker) => {
    console.log(
      `Transbordador ${tracker.nombre} (${tracker.id}) conectado al broker MQTT`
    );
    setInterval(() => {
      const beacons = tracker.generateBeacon();
      const beaconArray = Array.isArray(beacons) ? beacons : [beacons];

      const payload = {
        trackerID: tracker.id,
        beacons: beaconArray,
      };

      client.publish("position/transbordador", JSON.stringify(payload));
    }, tracker.interval);
  });

  console.log("Connected to MQTT Broker");

  // Para cada tracker, se ejecuta un intervalo para publicar los datos
  // trackers.forEach((tracker) => {
  //   if (tracker.prefix === "A") {
  //     setInterval(() => {
  //       const beacons = tracker.generateBeacon();
  //       const beaconArray = Array.isArray(beacons) ? beacons : [beacons]; // Asegura que las balizas sean un array

  //       beaconArray.forEach((beacon) => {
  //         const payload = createTrackerPayload(
  //           tracker,
  //           beacon,
  //           beacon.via,
  //           beacon.minor
  //         );
  //         // Si el tracker es "Activo 1", simulado como montado en transbordador, no se incluye el rails en el payload
  //         if (tracker.id === 1 && tracker.prefix === "A") {
  //           delete payload.rails;
  //         }

  //         client.publish(tracker.topic, JSON.stringify(payload));
  //       });
  //     }, tracker.interval);
  //   }
  // });
});
