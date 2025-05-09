require("dotenv").config();
const {
  createController,
  findAllController,
  findByIdController,
  updateController,
  deleteController,
} = require("./Base.Controller");

const TrackerService = require("../services/Tracker.Service");
const { encontrarPosicionTracker } = require("../utils/posicionTracker");

// --- Controladores CRUD básicos reutilizando Base.Controller ---
const create = createController(TrackerService.create);
const findAll = findAllController(TrackerService.findAll);
const findById = findByIdController(TrackerService.findById);
const update = updateController(TrackerService.update);
const remove = deleteController(TrackerService.remove);

/**
 * Procesa un mensaje MQTT recibido con información de un tracker.
 * Calcula la posición basada en las balizas cercanas, determina la más próxima
 * y actualiza la posición del tracker en la base de datos.
 *
 * @async
 * @function
 * @param {Object} message - Objeto con los datos del tracker recibido por MQTT.
 * @param {string|number} message.trackerId - Identificador único del tracker.
 * @param {Array<Object>} message.balizasCercanas - Lista de balizas cercanas con campos `mayor`, `minor`, e `intensidad`.
 * @returns {Promise<Object|void>} Retorna la posición calculada si todo es exitoso, o `undefined` si hay error.
 */
async function manejarMensajeTracker(message) {
  try {
    const trackerData = message;

    const { trackerId, balizasCercanas } = trackerData;

    if (!trackerId) {
      throw new Error("El trackerId no está definido en el mensaje.");
    }

    // Calculamos la posición del tracker usando las balizas cercanas (ya ordenadas por intensidad)
    const posicion = await encontrarPosicionTracker(balizasCercanas);
    //console.log('📍 Posición encontrada:', posicion);

    // Verificamos si la posición es válida
    if (!posicion || typeof posicion !== "object") {
      throw new Error("La posición no es válida o no fue encontrada.");
    }
    // Incluimos el trackerId en el objeto posición
    posicion.trackerId = trackerId;
    // La baliza más cercana es la primera de la lista después de que se haya ordenado
    const balizaMasCercana = balizasCercanas.find(
      (baliza) => baliza.via === posicion.via && baliza.minor === posicion.minor
    );

    if (!balizaMasCercana) {
      throw new Error("No se pudo determinar la baliza más cercana.");
    }

    // Imprimimos la baliza más cercana al tracker
    console.log("Baliza más cercana al tracker:", balizaMasCercana);

    // Actualizamos la posición del tracker en la base de datos
    await TrackerService.actualizarPosicionDesdeMQTT(posicion);

    // Retornamos la posición si se necesita hacer algo más
    return posicion;
  } catch (error) {
    console.error("❌ Error al procesar el mensaje del tracker:", error);
  }
}

// --- Exportamos ambos tipos de controladores ---
module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
  manejarMensajeTracker,
};
