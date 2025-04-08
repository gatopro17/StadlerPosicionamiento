// TrackerService.js
const BaseService = require('./Base.Service');
const { Tracker } = require('../models/Tracker'); 

class TrackerService {
  // Crear Tracker
  async create(data) {
    return await BaseService.create(Tracker, data);
  }

  // Obtener todos los Trackers
  async findAll() {
    return await BaseService.findAll(Tracker, [{ model: require('../models').Rail, as: 'rail' }]);
  }

  // Obtener Tracker por ID
  async findById(id) {
    return await BaseService.findById(Tracker, id, [{ model: require('../models').Rail, as: 'rail' }]);
  }

  // Actualizar Tracker
  async update(id, data) {
    return await BaseService.update(Tracker, id, data);
  }

  // Eliminar Tracker
  async remove(id) {
    return await BaseService.remove(Tracker, id);
  }
}

module.exports = new TrackerService();
