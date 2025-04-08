const {
  createController,
  findAllController,
  findByIdController,
  updateController,
  deleteController
} = require('./Base.Controller');

const TrackerService = require('../services/Tracker.Service');
const { encontrarPosicionTracker } = require('../utils/posicionTracker');

// --- Controladores CRUD básicos reutilizando Base.Controller ---
const create = createController(TrackerService.create);
const findAll = findAllController(TrackerService.findAll);
const findById = findByIdController(TrackerService.findById);
const update = updateController(TrackerService.update);
const remove = deleteController(TrackerService.remove);

// --- Función personalizada para manejar datos desde MQTT ---
async function manejarMensajeTracker(message) {
  try {
    const trackerData = JSON.parse(message);
    const { id, balizasCercanas } = trackerData;

    const posicion = await encontrarPosicionTracker(balizasCercanas);

    await TrackerService.actualizarPosicionDesdeMQTT(id, posicion);
  } catch (error) {
    console.error('❌ Error al procesar el mensaje del tracker:', error);
  }
}

// --- Exportamos ambos tipos de controladores ---
module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  manejarMensajeTracker 
};
