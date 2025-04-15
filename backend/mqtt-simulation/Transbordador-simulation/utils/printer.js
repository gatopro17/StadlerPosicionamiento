// Requiere el módulo 'state', que gestiona el estado actual de los trackers
const state = require('./state');

// Función para imprimir el estado actual de los trackers
function printStatus() {
  // Obtiene todos los estados actuales de los trackers desde 'state'. Si no hay estados, se usa un objeto vacío.
  const statuses = state.getAllStatuses() || {};

  // Limpiar la consola antes de imprimir los nuevos datos.
  console.clear();
  console.log('🚦 Current Tracker Statuses:'); // Título para indicar que a continuación se mostrarán los estados de los trackers.

  // Recorre cada tracker y su estado asociado
  Object.entries(statuses).forEach(([trackerID, status]) => {
    // Obtiene los detalles del tracker desde el buffer de estado usando el trackerID.
    const trackerDetails = state.getBuffer(trackerID)?.[0];
    if (!trackerDetails) return; // Si no se encuentran detalles del tracker, salta esta iteración.

    // Desestructura los detalles del tracker.
    const { trackerName, rail, rssi, beaconId, position } = trackerDetails;

    let location = 'Unknown'; // Inicializa la ubicación del tracker como 'Desconocida'.

    // Verifica si el estado incluye información de acoplamiento (por ejemplo, "coupled with").
    const isCoupled = status.includes('coupled with');
    if (isCoupled) {
      // Si el tracker está acoplado, imprime el estado de acoplamiento y sale de la función para no continuar con la impresión del resto.
      console.log(`🧲 ${status}`);
      return;
    }

    // Si el tracker es un activo (por ejemplo, A-2), muestra la ubicación en el rail y la posición.
    if (trackerID.startsWith('A-') && rail !== undefined && position !== undefined) {
      location = `Rail ${rail} in position ${position}`;
    } else if (rail !== undefined) {
      // Si el rail está definido pero no la posición, solo muestra el rail.
      location = `Rail ${rail}`;
    } else if (beaconId) {
      // Si no hay rail definido, pero hay un beaconId, determina la ubicación del tracker según el prefijo del beaconId.
      const prefix = beaconId.charAt(0).toUpperCase(); // Obtiene el primer carácter del beaconId y lo convierte a mayúsculas.
      switch (prefix) {
        case 'G': // Si el beaconId comienza con 'G', es un transbordador grande.
          location = 'Transbordador Grande';
          break;
        case 'M': // Si el beaconId comienza con 'M', es un transbordador mediano.
          location = 'Transbordador Mediano';
          break;
        case 'P': // Si el beaconId comienza con 'P', es un transbordador pequeño.
          location = 'Transbordador Pequeño';
          break;
        default:
          // Si el beaconId no comienza con 'G', 'M' o 'P', simplemente lo imprime como una baliza.
          location = `Baliza ${beaconId}`;
      }
    }

    // Imprime la información del tracker: ID, nombre, ubicación, y el valor de RSSI.
    console.log(`🆔 ${trackerID}: ${trackerName} is on ${location}, RSSI: ${rssi}`);
  });
}

// Exporta la función 'printStatus' para que pueda ser utilizada en otros archivos.
module.exports = {
  printStatus,
};
