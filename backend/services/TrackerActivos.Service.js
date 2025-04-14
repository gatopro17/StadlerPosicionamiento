require("dotenv").config();
const BaseService = require('./Base.Service');
const { TrackerActivos } = require('../models/associations');

class TrackerActivosService {
  async create(data) {
    return await BaseService.create(TrackerActivos, data);
  }

  async findAll() {
    return await BaseService.findAll(TrackerActivos);
  }

  async findById(id) {
    return await BaseService.findById(TrackerActivos, id);
  }

  async update(id, data) {
    return await BaseService.update(TrackerActivos, id, data);
  }

  async remove(id) {
    return await BaseService.remove(TrackerActivos, id);
  }
}

module.exports = new TrackerActivosService();
