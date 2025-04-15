// Requiere los módulos 'state' y 'printer'. 'state' gestiona el estado de los trackers, 'printer' imprime información en consola.
const state = require('./state');
const printer = require('./printer');

// Función para obtener el beacon con la señal más fuerte de un arreglo de señales.
function getStrongestSignal(signals) {
  // Utiliza 'reduce' para recorrer las señales y devolver la que tenga el RSSI más alto.
  return signals.reduce((max, current) => (current.rssi > max.rssi ? current : max), signals[0]);
}

// Umbrales de RSSI y tiempo para considerar que dos trackers están acoplados.
const COUPLING_RSSI_THRESHOLD = 5;
const COUPLING_TIMESTAMP_THRESHOLD = 1000;  // 1 segundo

// Función para verificar si dos trackers están acoplados, basándose en su RSSI y su timestamp.
function areCoupled(trackerA, trackerB) {
    // Si los dos trackers son el mismo, no se puede acoplar.
    if (trackerA.trackerID === trackerB.trackerID) return false;

    // Calcula la diferencia de RSSI y de tiempo entre los dos trackers.
    const rssiDifference = Math.abs(trackerA.rssi - trackerB.rssi);
    const timestampDifference = Math.abs(trackerA.timestamp - trackerB.timestamp);

    // Define los pares de trackers que pueden acoplarse (por ejemplo, T-1 puede acoplarse con T-3).
    const validCoupling = {
        'T-1': ['T-3'],
        'T-2': ['T-3'],
        'T-3': ['T-1', 'T-2'],
    };

    // Verifica si la combinación de trackers es válida para acoplarse.
    const isValidCoupling = validCoupling[trackerA.trackerID]?.includes(trackerB.trackerID);
    if (!isValidCoupling) return false;

    // Imprime los valores de RSSI y de tiempo de los trackers para depuración.
    console.log(`Comparing Tracker ${trackerA.trackerID} with Tracker ${trackerB.trackerID} - RSSI Difference: ${rssiDifference}, Timestamp Difference: ${timestampDifference}ms`);

    // Si el beaconId es el mismo, y la diferencia de RSSI y tiempo está por debajo de los umbrales, se considera un acoplamiento.
    return (
        trackerA.beaconId === trackerB.beaconId &&
        rssiDifference < COUPLING_RSSI_THRESHOLD &&
        timestampDifference < COUPLING_TIMESTAMP_THRESHOLD
    );
}

// Función para comprobar el acoplamiento entre el tracker actual y otros trackers en los buffers.
function checkCoupling(trackerID, data) {
    const allBuffers = state.getAllBuffers();  // Obtiene todos los buffers de trackers almacenados.
    let foundCoupling = false;

    // Para evitar imprimir múltiples veces en cada ciclo, almacenamos los mensajes de acoplamiento.
    let couplingMessages = [];

    // Recorre todos los buffers de los demás trackers para buscar acoplamientos.
    Object.entries(allBuffers).forEach(([otherID, buffer]) => {
        if (trackerID === otherID) return; // No comparar el tracker consigo mismo.

        buffer.forEach((otherData) => {
            // Si los dos trackers están acoplados, se procesa el acoplamiento.
            if (areCoupled(data, otherData)) {
                const timestampDifference = Math.abs(data.timestamp - otherData.timestamp);
                const rssiDifference = Math.abs(data.rssi - otherData.rssi);

                // Crea un mensaje que describe el acoplamiento detectado.
                const message = `🚦 Acoplamiento Detectado: Transbordador ${data.trackerName} (ID: ${trackerID}) está acoplado con Transbordador ${otherData.trackerName} (ID: ${otherID}) en Rail ${data.rail}. RSSI Difference: ${rssiDifference}, Timestamp Difference: ${timestampDifference}ms`;

                // Agrega el mensaje al arreglo de acoplamientos.
                couplingMessages.push(message);

                // Actualiza el estado de los trackers acoplados.
                state.setTrackerStatus(trackerID, `Tracker ${trackerID} is coupled with Tracker ${otherID}`);
                state.setTrackerStatus(otherID, `Tracker ${otherID} is coupled with Tracker ${trackerID}`);
                
                foundCoupling = true; // Se encontró un acoplamiento.
            }
        });
    });

    if (foundCoupling) {
        // Si se detectó un acoplamiento, imprime todos los mensajes de acoplamiento.
        couplingMessages.forEach(msg => console.log(msg));
        printer.printStatus();  // Imprime el estado actualizado de todos los trackers.
    }

    return foundCoupling;  // Devuelve si se encontró un acoplamiento.
}

// Función para obtener el estado de un tracker.
function getTrackerStatus(trackerID, data, strongest) {
    // Si el tracker está dentro de un transbordador interno, muestra el ID del transbordador.
    if (data.internal) {
        return `Tracker ${trackerID} is inside Transbordador ${data.internalTransbordadorID}`;
    } else {
        // Si no está dentro de un transbordador, muestra en qué rail se encuentra.
        return `Transbordador ${trackerID} is on Rail ${strongest.rail}`;
    }
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
    const trackerID = data.trackerID;  // Obtiene el ID del tracker.
    const currentTime = new Date().getTime();  // Obtiene el timestamp actual.
    data.timestamp = data.timestamp || currentTime;  // Si no hay timestamp, usa el actual.

    state.updateBuffer(trackerID, data);  // Actualiza el buffer del tracker con los nuevos datos.
    const buffer = state.getBuffer(trackerID);  // Obtiene el buffer actualizado del tracker.
    const strongest = getStrongestSignal(buffer);  // Obtiene el beacon con la señal más fuerte.

    let status;

    if (type === 'tracker') {
        // Si el tipo es 'tracker', obtiene el estado del tracker.
        status = getTrackerStatus(trackerID, data, strongest);

        const coupled = checkCoupling(trackerID, data);  // Verifica si el tracker está acoplado con otro.
        if (!coupled) {
            // Si no está acoplado, imprime el estado del tracker.
            console.log(`Tracker ${trackerID} status: ${status}`);
            state.setTrackerStatus(trackerID, status);  // Actualiza el estado del tracker.
            printer.printStatus();  // Imprime el estado actualizado de todos los trackers.
        }
    } else if (type === 'asset') {
        // Si el tipo es 'asset', obtiene el estado del activo.
        status = getAssetStatus(trackerID, data, strongest);
        state.setTrackerStatus(trackerID, status);  // Actualiza el estado del activo.
        printer.printStatus();  // Imprime el estado actualizado de todos los trackers.
    }
}

// Exporta las funciones para que puedan ser utilizadas en otros módulos.
module.exports = {
  processMessage,
  areCoupled
};
