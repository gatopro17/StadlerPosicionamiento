// Requiere los módulos 'state' y 'printer'. 'state' gestiona el estado de los trackers, 'printer' imprime información en consola.
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });
const state = require('./state');
const printer = require('./printer');
const { handleCouplingLog } = require('./logHandlers');
// Función para obtener el beacon con la señal más fuerte de un arreglo de señales.
function getStrongestSignal(signals) {
  // Utiliza 'reduce' para recorrer las señales y devolver la que tenga el RSSI más alto.
  return signals.reduce((max, current) => (current.rssi > max.rssi ? current : max), signals[0]);
}

// Umbrales de RSSI y tiempo para considerar que dos trackers están acoplados.
const COUPLING_RSSI_THRESHOLD = 90;
const COUPLING_TIMESTAMP_THRESHOLD = 1000;  // 1 segundo

// Función para verificar si dos trackers están acoplados, basándose en su RSSI y su timestamp.
function areCoupled(trackerData) {
    const { trackerID, beaconId, rssi, timestamp } = trackerData;

// Transbordadores grandes que pueden acoplarse con pequeños
    const largeTransbordadores = ['T-1', 'T-2'];
    const smallTransbordadores = ['T-3']; // Aquí defines cuáles son los pequeños

    // Solo procesamos si es un transbordador grande
    if (!largeTransbordadores.includes(trackerID)) return false;

    // Verificamos que la señal provenga de un transbordador pequeño
    const isSmallTransbordadorBeacon = smallTransbordadores.includes(beaconId);

    if (!isSmallTransbordadorBeacon) return false;

    // Condiciones de umbral
    const currentTime = Date.now();
    const timeDiff = Math.abs(currentTime - timestamp);
    const isValidRSSI = rssi > -COUPLING_RSSI_THRESHOLD; // Se asume un valor absoluto para RSSI (más cerca de 0 es mejor)
    const isRecent = timeDiff < COUPLING_TIMESTAMP_THRESHOLD;
    
    return isValidRSSI && isRecent;
}


// Función para comprobar el acoplamiento entre el tracker actual y otros trackers en los buffers.
function checkCoupling(trackerID, data) {
    const largeTransbordadores = ['T-1', 'T-2'];
    const smallTransponders = ['T-3'];
    const beaconID = data.beaconId;
    
    // Verificamos si el tracker actual es un transbordador grande
    if (!largeTransbordadores.includes(trackerID)) return false;

    // Verificamos si el beacon recibido corresponde a un transbordador pequeño
    const isFromSmallTransbordador = smallTransponders.includes(beaconID);
    if (!isFromSmallTransbordador) return false;

    // Verificamos los umbrales
    const currentTime = Date.now();
    const timeDiff = Math.abs(currentTime - data.timestamp);
    const isValidRSSI = data.rssi > -COUPLING_RSSI_THRESHOLD;
    const isRecent = timeDiff < COUPLING_TIMESTAMP_THRESHOLD;
    if (isValidRSSI && isRecent) {
        const message = `🚦 Acoplamiento Detectado: Transbordador grande ${data.trackerName} (ID: ${trackerID}) ha detectado al pequeño ${beaconID} en Rail ${data.rail}`;
        console.log(message);
        datos= {
            tracker1Id: trackerID,
            tracker2Id: beaconID,
            rail: data.rail,
            rssiDifference: data.rssi,
            timestampDiffMs: timeDiff
        };
        handleCouplingLog(datos); // Guarda el log de acoplamiento
        console.log(`Log de acoplamiento guardado para ${trackerID} y ${beaconID}`);

        // Actualizamos estado
        state.setTrackerStatus(trackerID, `Acoplado con ${beaconID}`);
        state.setTrackerStatus(beaconID, `Acoplado con ${trackerID}`);

        printer.printStatus();
        return true;
    }

    return false;
}


// Función para obtener el estado de un tracker.
function getTrackerStatus(trackerID) {

    const status = state.getTrackerStatus(trackerID);
    if (status && status.startsWith("Acoplado con")) {
        return `🔗 ${trackerID} ${status}`;
    }
    return `📡 ${trackerID} activo sin acoplamiento`;
}


// Función para obtener el estado de un activo (tracker que no es transbordador).
function getAssetStatus(trackerID, data, strongest) {
    // Si el activo tiene un beacon de tipo interno, muestra en qué transbordador está montado.
    if (data.beaconType === 'internal') {
        return `Asset ${trackerID} is mounted on Transbordador ${data.beaconId}`;
    } else {
        // Si el activo no tiene beacon interno, muestra el rail en el que se encuentra.
        return `Asset ${trackerID} is on Rail ${strongest.rail}`;
    }
}

// Función principal para procesar los mensajes de los trackers y activos.
function processMessage(data, type = 'tracker') {
    const trackerID = data.trackerID;
    const currentTime = new Date().getTime();
    data.timestamp = data.timestamp || currentTime;

    state.updateBuffer(trackerID, data);
    const buffer = state.getBuffer(trackerID);
    const strongest = getStrongestSignal(buffer);

    // Aplica la lógica dependiendo del tipo de dispositivo
    if (type === 'tracker') {
        const coupled = checkCoupling(trackerID, data); // Verifica acoplamiento
        const status = getTrackerStatus(trackerID); // Obtiene estado (ahora revisa si está acoplado)

        state.setTrackerStatus(trackerID, status);
        console.log(`📍 Estado actual de ${trackerID}: ${status}`);
        printer.printStatus();  // Muestra todos los estados

    } else if (type === 'asset') {
        const status = getAssetStatus(trackerID, data, strongest);
        state.setTrackerStatus(trackerID, status);
        console.log(`📦 Estado de activo ${trackerID}: ${status}`);
        printer.printStatus();
    }
}


// Exporta las funciones para que puedan ser utilizadas en otros módulos.
module.exports = {
  processMessage,
  areCoupled
};
