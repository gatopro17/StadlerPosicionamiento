const state = require('./state');
function printStatus() {
  const statuses = state.getAllStatuses() || {};

  console.clear();
  console.log('🚦 Current Tracker Statuses:');

  Object.entries(statuses).forEach(([trackerID, status]) => {
    const trackerDetails = state.getBuffer(trackerID)?.[0];

    if (!trackerDetails) return;

    const { trackerName, rail, rssi, beaconId, position } = trackerDetails;

    let location = 'Unknown';

    // Si es un activo (A-2), mostramos rail y posición
    if (trackerID.startsWith('A-') && rail !== undefined && position !== undefined) {
      location = `Rail ${rail} in position ${position}`;
    } else if (rail !== undefined) {
      location = `Rail ${rail}`;
    } else if (beaconId) {
      // Determinar tipo de transbordador según prefijo del beaconId
      const prefix = beaconId.charAt(0).toUpperCase();

      switch (prefix) {
        case 'G':
          location = 'Transbordador Grande';
          break;
        case 'M':
          location = 'Transbordador Mediano';
          break;
        case 'P':
          location = 'Transbordador Pequeño';
          break;
        default:
          location = `Baliza ${beaconId}`;
      }
    }

    console.log(`🆔 ${trackerID}: ${trackerName} is on ${location}, RSSI: ${rssi}`);
  });
}
module.exports = {
  printStatus,
};