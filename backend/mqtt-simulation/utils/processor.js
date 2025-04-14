// utils/processor.js
const state = require('./state');
const printer = require('./printer');


function getStrongestSignal(signals) {
  return signals.reduce((max, current) => (current.rssi > max.rssi ? current : max), signals[0]);
}


const COUPLING_RSSI_THRESHOLD = 5;
const COUPLING_TIMESTAMP_THRESHOLD = 1000;  // 1 segundo

function areCoupled(trackerA, trackerB) {
    if (trackerA.trackerID === trackerB.trackerID) return false;
  const rssiDifference = Math.abs(trackerA.rssi - trackerB.rssi);
  const timestampDifference = Math.abs(trackerA.timestamp - trackerB.timestamp);

  console.log(`Comparing Tracker ${trackerA.trackerID} with Tracker ${trackerB.trackerID} - RSSI Difference: ${rssiDifference}, Timestamp Difference: ${timestampDifference}ms`);

  return (
    trackerA.beaconId === trackerB.beaconId &&
    rssiDifference < COUPLING_RSSI_THRESHOLD &&
    timestampDifference < COUPLING_TIMESTAMP_THRESHOLD
  );
}

function checkCoupling(trackerID, data) {
    const allBuffers = state.getAllBuffers();
    let foundCoupling = false;

    // Evitar imprimir múltiples veces en cada ciclo
    let couplingMessages = [];

    Object.entries(allBuffers).forEach(([otherID, buffer]) => {
      if (trackerID === otherID) return;

      buffer.forEach((otherData) => {
        if (areCoupled(data, otherData)) {
          const timestampDifference = Math.abs(data.timestamp - otherData.timestamp);
          const rssiDifference = Math.abs(data.rssi - otherData.rssi);

          const message = `🚦 Acoplamiento Detectado: Transbordador ${data.trackerName} (ID: ${trackerID}) está acoplado con Transbordador ${otherData.trackerName} (ID: ${otherID}) en Rail ${data.rail}. RSSI Difference: ${rssiDifference}, Timestamp Difference: ${timestampDifference}ms`;

          // Agregar el mensaje a un arreglo de acoplamientos
          couplingMessages.push(message);
          
          state.setTrackerStatus(trackerID, `Tracker ${trackerID} is coupled with Tracker ${otherID}`);
          state.setTrackerStatus(otherID, `Tracker ${otherID} is coupled with Tracker ${trackerID}`);
          
          foundCoupling = true;
        }
      });
    });

    if (foundCoupling) {
      // Imprimir todos los mensajes de acoplamiento detectados de una sola vez
      couplingMessages.forEach(msg => console.log(msg));
      printer.printStatus();  // Imprime el estado actualizado de todos los trackers
    }

    return foundCoupling;
}


function getTrackerStatus(trackerID, data, strongest) {
    if (data.internal) {
      return `Tracker ${trackerID} is inside Transbordador ${data.internalTransbordadorID}`;
    } else {
      return `Transbordador ${trackerID} is on Rail ${strongest.rail}`;
    }
  }
  
  function getAssetStatus(trackerID, data, strongest) {
    if (data.beaconType === 'internal') {
      return `Asset ${trackerID} is mounted on Transbordador ${data.beaconId}`;
    } else {
      return `Asset ${trackerID} is on Rail ${strongest.rail}`;
    }
  }
  
  function processMessage(data, type = 'tracker') {
    const trackerID = data.trackerID;
    const currentTime = new Date().getTime();
    data.timestamp = data.timestamp || currentTime;
  
    state.updateBuffer(trackerID, data);
    const buffer = state.getBuffer(trackerID);
    const strongest = getStrongestSignal(buffer);
    
    let status;
  
    if (type === 'tracker') {
      status = getTrackerStatus(trackerID, data, strongest);
  
      const coupled = checkCoupling(trackerID, data);
      if (!coupled) {
        console.log(`Tracker ${trackerID} status: ${status}`);
        state.setTrackerStatus(trackerID, status);
        printer.printStatus();
      }
  
    } else if (type === 'asset') {
      status = getAssetStatus(trackerID, data, strongest);
      state.setTrackerStatus(trackerID, status);
      printer.printStatus();
    }
  }

module.exports = {
  processMessage,
  areCoupled
};
