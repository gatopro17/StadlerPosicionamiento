// Objeto 'state' que mantiene el estado interno del sistema.
// - trackerBuffers: almacena los últimos mensajes recibidos por cada tracker.
// - trackerStatus: guarda el estado interpretado final de cada tracker.
const state = {
  trackerBuffers: {}, // Buffer temporal por ID de tracker
  trackerStatus: {}   // Estado final interpretado por ID de tracker
};

/**
 * Actualiza el buffer de un tracker específico.
 * 
 * Esta función almacena los datos recibidos para cada tracker y mantiene un 
 * buffer de tamaño fijo (últimos 5 mensajes).
 *
 * @param {string} trackerID - El ID del tracker.
 * @param {Object} data - Los datos a añadir al buffer.
 */
function updateBuffer(trackerID, data) {
  // Si el tracker no tiene aún un buffer, lo inicializa como arreglo vacío
  if (!state.trackerBuffers[trackerID]) {
    state.trackerBuffers[trackerID] = [];
  }

  // Agrega los nuevos datos al buffer
  state.trackerBuffers[trackerID].push(data);

  // Mantiene solo los últimos 5 mensajes (puedes ajustar el número si lo deseas)
  if (state.trackerBuffers[trackerID].length > 5) {
    state.trackerBuffers[trackerID].shift(); // Elimina el más antiguo
  }
}

/**
 * Obtiene el buffer de un tracker específico.
 * 
 * @param {string} trackerID - El ID del tracker.
 * @returns {Array} - El arreglo de datos almacenado para ese tracker.
 */
function getBuffer(trackerID) {
  return state.trackerBuffers[trackerID] || [];
}

/**
 * Obtiene todos los buffers de trackers.
 * 
 * @returns {Object} - Un objeto con todos los buffers, indexados por ID de tracker.
 */
function getAllBuffers() {
  return state.trackerBuffers;
}

/**
 * Establece el estado de un tracker específico.
 * 
 * @param {string} trackerID - El ID del tracker.
 * @param {string} status - El estado a asignar al tracker.
 */
function setTrackerStatus(trackerID, status) {
  state.trackerStatus[trackerID] = status;
}

/**
 * Obtiene el estado actual de un tracker específico.
 * 
 * @param {string} trackerID - El ID del tracker.
 * @returns {string} - El estado asociado a ese tracker.
 */
function getTrackerStatus(trackerID) {
  return state.trackerStatus[trackerID];
}

/**
 * Obtiene los estados de todos los trackers.
 * 
 * @returns {Object} - Un objeto con los estados, indexados por ID de tracker.
 */
function getAllStatuses() {
  return state.trackerStatus;
}

// Exporta todas las funciones para ser usadas en otros módulos del sistema.
module.exports = {
  updateBuffer,
  getBuffer,
  setTrackerStatus,
  getTrackerStatus,
  getAllStatuses,
  getAllBuffers
};
