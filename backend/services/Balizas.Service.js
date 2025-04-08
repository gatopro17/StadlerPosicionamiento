// BalizaService.js
const BaseService = require('./Base.Service');
const { Balizas } = require('../models/Balizas'); // Asegúrate de importar el modelo Balizas

class BalizasService {
  // Crear Baliza
  async create(data) {
    return await BaseService.create(Balizas, data);
  }

  // Obtener todas las Balizas
  async findAll() {
    return await BaseService.findAll(Balizas, [{ model: require('../models').Rail, as: 'rail' }]);
  }

  // Obtener Baliza por ID
  async findById(id) {
    return await BaseService.findById(Balizas, id, [{ model: require('../models').Rail, as: 'rail' }]);
  }

  // Actualizar Baliza
  async update(id, data) {
    return await BaseService.update(Balizas, id, data);
  }

  // Eliminar Baliza
  async remove(id) {
    return await BaseService.remove(Balizas, id);
  }
}

module.exports = new BalizasService();
