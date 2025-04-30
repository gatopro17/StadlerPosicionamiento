require("dotenv").config();
const { CouplingLogs } = require('../models/associations');
const BaseService = require('./Base.Service');

class CouplingLogsService {
    async create(data) {
        return await BaseService.create(CouplingLogs, data);
    }
    async findAll() {
        return await BaseService.findAll(CouplingLogs);
    }
    async findById(id) {
        return await BaseService.findById(CouplingLogs, id);
    }
    async update(id, data) {
        return await BaseService.update(CouplingLogs, id, data);
    }
    async remove(id) {
        return await BaseService.remove(CouplingLogs, id);
    }
}
module.exports = new CouplingLogsService();