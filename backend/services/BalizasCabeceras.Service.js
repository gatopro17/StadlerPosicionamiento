require("dotenv").config();
const BaseService = require('./Base.Service');
const { BalizasCabeceras } = require('../models/associations');

class BalizasCabecerasService {
  async create(data) {
    return await BaseService.create(BalizasCabeceras, data);
  }

  async findAll() {
    return await BaseService.findAll(BalizasCabeceras);
  }

  async findById(id) {
    return await BaseService.findById(BalizasCabeceras, id);
  }

  async update(id, data) {
    return await BaseService.update(BalizasCabeceras, id, data);
  }

  async remove(id) {
    return await BaseService.remove(BalizasCabeceras, id);
  }
}

module.exports = new BalizasCabecerasService();
