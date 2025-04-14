require("dotenv").config();
const BaseService = require('./Base.Service');
const { Agujas } = require('../models/associations');

class AgujasService {
  async create(data) {
    return await BaseService.create(Agujas, data);
  }

  async findAll() {
    return await BaseService.findAll(Agujas);
  }

  async findById(id) {
    return await BaseService.findById(Agujas, id);
  }

  async update(id, data) {
    return await BaseService.update(Agujas, id, data);
  }

  async remove(id) {
    return await BaseService.remove(Agujas, id);
  }
}

module.exports = new AgujasService();
