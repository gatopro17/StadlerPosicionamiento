// utils/printer.js
const state = require('./state');
/**
 * Prints the current status of all trackers to the console.
 * 
 * - Clears the console.
 * - Retrieves the current status of all trackers from the state module.
 * - Displays each tracker ID with its associated status in a readable format.
 */
function printStatus() {
    const statuses = state.getAllStatuses() || {};
  
    console.clear();
    console.log('🚦 Current Tracker Statuses:');
    Object.entries(statuses).forEach(([trackerID, status]) => {
     // Imprime el estado con más detalles (e.g., RSSI, Rail)
     const trackerDetails = state.getBuffer(trackerID)[0]; // Obtener los detalles más recientes del tracker
     const { trackerName, rail, rssi } = trackerDetails || {};

     // Log más detallado del estado del tracker
     console.log(`🆔 ${trackerID}: ${trackerName} is on Rail ${rail}, RSSI: ${rssi}`);
    });
  }
module.exports = {
  printStatus
};
