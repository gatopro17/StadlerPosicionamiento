require("dotenv").config();
const BaseService = require('./Base.Service');
const { AssetMountLogs } = require('../models/associations');

class AssetMountLogsService {
  async create(data) {
    return await BaseService.create(AssetMountLogs, data);
  }

  async findAll() {
    return await BaseService.findAll(AssetMountLogs);
  }

  async findById(id) {
    return await BaseService.findById(AssetMountLogs, id);
  }

  async update(id, data) {
    return await BaseService.update(AssetMountLogs, id, data);
  }

  async remove(id) {
    return await BaseService.remove(AssetMountLogs, id);
  }
}
module.exports = new AssetMountLogsService();