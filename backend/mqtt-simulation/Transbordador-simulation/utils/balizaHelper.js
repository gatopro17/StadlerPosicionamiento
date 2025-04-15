// Función para generar una baliza de tipo cabecera para un rail específico
// La cabecera tiene una posición fija (minor = 1) y un identificador basado en el número de rail.
const generateCabeceraBeacon = (railNumber) => ({
  id: `cabecera-${railNumber}`,  // El ID de la cabecera está basado en el número de rail.
  mayor: railNumber,             // 'Mayor' es el número del rail.
  minor: 1,                      // La posición de la cabecera siempre es 1.
});

// Función para generar las balizas de un transbordador (grande, mediano, pequeño) basado en su ID.
const generateTransbordadorBeacon = (id) => {
  const prefix = `T-${id}`;  // Prefijo para identificar el transbordador.

  let beacons = [];  // Array para almacenar las balizas generadas.

  // Condiciones para generar las balizas de acuerdo al tamaño del transbordador
  if (id === 1) {  // Si el ID es 1, el transbordador es grande.
    beacons = Array.from({ length: 6 }, (_, i) => ({
      id: `G${i + 1}`,               // ID de la baliza, como G1, G2, ..., G6.
      nombre: `Baliza G${i + 1}`,     // Nombre de la baliza, como "Baliza G1", "Baliza G2", etc.
      trackerID: prefix,             // ID del tracker (transbordador), por ejemplo: T-1.
      mayor: 100 + id,               // Número mayor (rail) asociado con el transbordador.
      minor: i + 1                   // Número minor, representando la posición de la baliza en el transbordador (de 1 a 6).
    }));
  } else if (id === 2) {  // Si el ID es 2, el transbordador es mediano.
    beacons = Array.from({ length: 4 }, (_, i) => ({
      id: `M${i + 1}`,               // ID de la baliza, como M1, M2, M3, M4.
      nombre: `Baliza M${i + 1}`,     // Nombre de la baliza, como "Baliza M1", "Baliza M2", etc.
      trackerID: prefix,             // ID del tracker (transbordador), por ejemplo: T-2.
      mayor: 100 + id,               // Número mayor (rail) asociado con el transbordador.
      minor: i + 1                   // Número minor, representando la posición de la baliza en el transbordador (de 1 a 4).
    }));
  } else if (id === 3) {  // Si el ID es 3, el transbordador es pequeño.
    beacons = [{
      id: 'P1',                     // ID de la baliza, solo P1.
      nombre: 'Baliza P1',           // Nombre de la baliza "Baliza P1".
      trackerID: prefix,             // ID del tracker (transbordador), por ejemplo: T-3.
      mayor: 100 + id,               // Número mayor (rail) asociado con el transbordador.
      minor: 1                       // Número minor, siempre 1 en el caso de un transbordador pequeño.
    }];
  }

  return beacons;  // Retorna el array de balizas generadas para el transbordador.
};

// Exporta las funciones para ser usadas en otros archivos.
module.exports = {
  generateCabeceraBeacon,    // Exporta la función para generar balizas de cabecera.
  generateTransbordadorBeacon,  // Exporta la función para generar balizas de transbordador.
};
