// RailService.js
const BaseService = require('./Base.Service');
const { Rail } = require('../models/Rail'); // Asegúrate de importar el modelo Rail

class RailService {
  // Crear Rail
  async create(data) {
    return await BaseService.create(Rail, data);
  }

  // Obtener todos los Rails
  async findAll() {
    return await BaseService.findAll(Rail);
  }

  // Obtener Rail por ID
  async findById(id) {
    return await BaseService.findById(Rail, id);
  }

  // Actualizar Rail
  async update(id, data) {
    return await BaseService.update(Rail, id, data);
  }

  // Eliminar Rail
  async remove(id) {
    return await BaseService.remove(Rail, id);
  }
}

module.exports = new RailService();
