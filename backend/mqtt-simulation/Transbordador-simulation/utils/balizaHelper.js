// Función para generar una baliza de tipo cabecera para un rails específico

const getRandomIntensity = require("./randomIntensity");

// La cabecera tiene una posición fija (minor = 1) y un identificador basado en el número de rails.
rail = Math.floor(Math.random() * 7) + 1;

function generateCabeceraBeacon() {}

function generateAcopladoBeacon() {
  let rail = Math.floor(Math.random() * 7) + 1;
  const traRandom = Math.floor(Math.random() * 3) + 1;

  // Forzar rail válido si no es 1 ni 2
  if (rail !== 1 && rail !== 2) {
    rail = Math.floor(Math.random() * 7) + 1;
  }

  const balizas = {
    cabecera1: {
      id: `C0${rail}C1`,
      intensidad: getRandomIntensity(),
    },
    cabecera2: {
      id: `C0${rail}C2`,
      intensidad: getRandomIntensity(),
    },
    extra1: {
      id: `C0${rail}_01`,
      intensidad: getRandomIntensity(),
    },
    extra2: {
      id: `C0${rail}_02`,
      intensidad: getRandomIntensity(),
    },
  };

  if (rail === 1 || rail === 2) {
    balizas.coupled = {
      id: `TRC1_01`,
      intensidad: getRandomIntensity(),
    };
  }

  return balizas;
}

// Función para generar las balizas de un transbordador (grande, mediano, pequeño) basado en su ID.
const generateTransbordadorBeacon = (id) => {
  const prefix = `T-${id}`; // Prefijo para identificar el transbordador.

  let beacons = []; // Array para almacenar las balizas generadas.

  // Condiciones para generar las balizas de acuerdo al tamaño del transbordador
  if (id === 1) {
    // Si el ID es 1, el transbordador es grande.
    beacons = Array.from({ length: 6 }, (_, i) => ({
      id: `G${i + 1}`, // ID de la baliza, como G1, G2, ..., G6.
      nombre: `Baliza G${i + 1}`, // Nombre de la baliza, como "Baliza G1", "Baliza G2", etc.
      trackerID: prefix, // ID del tracker (transbordador), por ejemplo: T-1.
      via: 100 + id, // Número mayor (rails) asociado con el transbordador.
      minor: i + 1, // Número minor, representando la posición de la baliza en el transbordador (de 1 a 6).
    }));
  } else if (id === 3) {
    // Si el ID es 3, el transbordador es pequeño.
    beacons = [
      {
        id: "P1", // ID de la baliza, solo P1.
        nombre: "Baliza P1", // Nombre de la baliza "Baliza P1".
        trackerID: prefix, // ID del tracker (transbordador), por ejemplo: T-3.
        via: 100 + id, // Número mayor (rails) asociado con el transbordador.
        minor: 1, // Número minor, siempre 1 en el caso de un transbordador pequeño.
      },
    ];
  }

  return beacons; // Retorna el array de balizas generadas para el transbordador.
};

// Exporta las funciones para ser usadas en otros archivos.
module.exports = {
  generateCabeceraBeacon, // Exporta la función para generar balizas de cabecera.
  generateTransbordadorBeacon, // Exporta la función para generar balizas de transbordador.
  generateAcopladoBeacon,
};
