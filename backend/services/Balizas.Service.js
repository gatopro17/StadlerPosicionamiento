// BalizaService.js
const BaseService = require("./Base.Service");
const { Balizas } = require("../models/associations");
require("dotenv").config();

/**
 * Servicio que maneja las operaciones CRUD para las balizas.
 * Utiliza el servicio base para realizar las operaciones comunes sobre el modelo Balizas.
 */
class BalizasService {
  // Crear Baliza
  async create(data) {
    return await BaseService.create(Balizas, data);
  }

  // Obtener todas las Balizas
  async findAll() {
    return await BaseService.findAll(Balizas);
  }

  // Obtener Baliza por ID
  async findById(id) {
    return await BaseService.findById(Balizas, id);
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
