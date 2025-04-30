require("dotenv").config();
const { TrackerPositionLogs } = require('../models/associations');
const BaseService = require('./Base.Service');

class TrackerPositionLogsService {
  async create(data) {
    return await BaseService.create(TrackerPositionLogs, data);
  }
  async findAll() {
    return await BaseService.findAll(TrackerPositionLogs);
  }
  async findById(id) {
    return await BaseService.findById(TrackerPositionLogs, id);
  }
  async update(id, data) {
    return await BaseService.update(TrackerPositionLogs, id, data);
  }
  async remove(id) {
    return await BaseService.remove(TrackerPositionLogs, id);
  }
}
module.exports = new TrackerPositionLogsService();
