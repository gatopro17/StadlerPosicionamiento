require("dotenv").config();
const BaseService = require('./Base.Service');
const { BalizasTransbordador } = require('../models/associations');

class BalizasTransbordadorService {
  async create(data) {
    return await BaseService.create(BalizasTransbordador, data);
  }

  async findAll() {
    return await BaseService.findAll(BalizasTransbordador);
  }

  async findById(id) {
    return await BaseService.findById(BalizasTransbordador, id);
  }

  async update(id, data) {
    return await BaseService.update(BalizasTransbordador, id, data);
  }

  async remove(id) {
    return await BaseService.remove(BalizasTransbordador, id);
  }
}

module.exports = new BalizasTransbordadorService();
