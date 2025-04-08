// TrackerService.js
const BaseService = require('./Base.Service');
const { Tracker } = require('../models/Tracker'); 
const { Rail } = require('../models/Rail'); // Asegúrate de tener acceso a Rail si es necesario

class TrackerService {
  // Crear Tracker
  async create(data) {
    return await BaseService.create(Tracker, data);
  }

  // Obtener todos los Trackers
  async findAll() {
    return await BaseService.findAll(Tracker, [{ model: Rail, as: 'rail' }]);
  }

  // Obtener Tracker por ID
  async findById(id) {
    return await BaseService.findById(Tracker, id, [{ model: Rail, as: 'rail' }]);
  }

  // Actualizar Tracker
  async update(id, data) {
    return await BaseService.update(Tracker, id, data);
  }

  // Eliminar Tracker
  async remove(id) {
    return await BaseService.remove(Tracker, id);
  }

  // ✅ Método personalizado: Actualizar posición desde MQTT
  async actualizarPosicionDesdeMQTT(id, posicion) {
    try {
      const tracker = await Tracker.findByPk(id);
      if (!tracker) {
        console.log(`Tracker con ID ${id} no encontrado.`);
        return null;
      }

      const updated = await this.update(id, {
        mayor: posicion.mayor,
        minor: posicion.minor
      });

      console.log(`✔ Tracker ${id} actualizado a rail ${posicion.mayor}, posición ${posicion.minor}`);
      return updated;
    } catch (error) {
      console.error('❌ Error al actualizar el tracker desde MQTT:', error);
      throw error;
    }
  }
}

module.exports = new TrackerService();
