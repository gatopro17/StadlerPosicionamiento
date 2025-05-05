// RailsService.js
const BaseService = require('./Base.Service');
const { Rails } = require('../models/Rails'); 

class RailsService {
  // Crear Rails
  async create(data) {
    return await BaseService.create(Rails, data);
  }

  // Obtener todos los Rails
  async findAll() {
    return await BaseService.findAll(Rails);
  }

  // Obtener Rails por ID
  async findById(id) {
    return await BaseService.findById(Rails, id);
  }

  // Actualizar Rails
  async update(id, data) {
    return await BaseService.update(Rails, id, data);
  }

  // Eliminar Rails
  async remove(id) {
    return await BaseService.remove(Rails, id);
  }
}

module.exports = new RailsService();
