require("dotenv").config();
const BaseService = require('./Base.Service');
const { TrackerTransbordador } = require('../models/associations');

class TrackerTransbordadorService {
  async create(data) {
    return await BaseService.create(TrackerTransbordador, data);
  }

  async findAll() {
    return await BaseService.findAll(TrackerTransbordador);
  }

  async findById(id) {
    return await BaseService.findById(TrackerTransbordador, id);
  }

  async update(id, data) {
    return await BaseService.update(TrackerTransbordador, id, data);
  }

  async remove(id) {
    return await BaseService.remove(TrackerTransbordador, id);
  }
}

module.exports = new TrackerTransbordadorService();
