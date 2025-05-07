require("dotenv").config();
const BaseService = require("./Base.Service");
const { Trackers } = require("../models/associations");

class TrackerService {
  // Crear Tracker
  async create(data) {
    return await BaseService.create(Trackers, data);
  }

  // Obtener todos los Trackers
  async findAll() {
    return await BaseService.findAll(Trackers);
  }

  // Obtener Tracker por ID
  async findById(id) {
    return await BaseService.findById(Trackers, id);
  }

  // Actualizar Tracker
  async update(id, data) {
    return await BaseService.update(Trackers, id, data);
  }

  // Eliminar Tracker
  async remove(id) {
    return await BaseService.remove(Trackers, id);
  }

  /**
   * Método personalizado para actualizar la posición del tracker desde un mensaje MQTT.
   *
   * Este método crea un nuevo log de TrackerLogs a partir de los datos de la posición recibida.
   *
   * @param {Object} posicion - Un objeto que contiene los detalles de la posición del tracker.
   * @param {string} posicion.nombre - El nombre de la baliza o posición.
   * @param {number} posicion.mayor - El valor mayor de la baliza (referente al rails).
   * @param {number} posicion.minor - El valor menor de la baliza (referente a la posición en el rails).
   * @param {number} posicion.trackerId - El ID del tracker asociado a esta posición.
   * @returns {Promise<Object>} El nuevo log de TrackerLogs creado.
   * @throws {Error} Si ocurre un error durante el registro del log.
   */
  async actualizarPosicionDesdeMQTT(posicion) {
    console.log("TrackerService: actualizarPosicionDesdeMQTT", posicion);
    try {
      // Insertamos un nuevo log directamente
      const log = await BaseService.create(TrackerLogs, {
        nombre: posicion.nombre,
        mayor: posicion.mayor,
        minor: posicion.minor,
        trackerId: posicion.trackerId,
      });

      console.log(
        `✔ Log registrado para tracker ${posicion.trackerId}: rails ${posicion.mayor}, posición ${posicion.minor}`
      );
      return log;
    } catch (error) {
      console.error("❌ Error al registrar log desde MQTT:", error);
      throw error;
    }
  }
}

module.exports = new TrackerService();
