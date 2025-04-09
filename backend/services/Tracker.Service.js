require("dotenv").config();
const BaseService = require('./Base.Service');
const { TrackerLogs, Rail } = require('../models/associations');

class TrackerService {
  // Crear Tracker
  async create(data) {
    return await BaseService.create(TrackerLogs, data);
  }

  // Obtener todos los Trackers
  async findAll() {
    return await BaseService.findAll(TrackerLogs, [{ model: Rail, as: 'Rail' }]);
  }

  // Obtener Tracker por ID
  async findById(id) {
    return await BaseService.findById(TrackerLogs, id, [{ model: Rail, as: 'Rail' }]);
  }

  // Actualizar Tracker
  async update(id, data) {
    return await BaseService.update(TrackerLogs, id, data);
  }

  // Eliminar Tracker
  async remove(id) {
    return await BaseService.remove(TrackerLogs, id);
  }

  // ✅ Método personalizado: Actualizar posición desde MQTT
  async actualizarPosicionDesdeMQTT(posicion) {
    console.log("TrackerService: actualizarPosicionDesdeMQTT", posicion);
    try {
      // Insertamos un nuevo log directamente
      const log = await BaseService.create(TrackerLogs, {
        nombre: posicion.nombre,
        mayor: posicion.mayor,
        minor: posicion.minor,
        trackerId: posicion.trackerId
      });

      console.log(`✔ Log registrado para tracker ${posicion.trackerId}: rail ${posicion.mayor}, posición ${posicion.minor}`);
      return log;
    } catch (error) {
      console.error('❌ Error al registrar log desde MQTT:', error);
      throw error;
    }
  }
}

module.exports = new TrackerService();
