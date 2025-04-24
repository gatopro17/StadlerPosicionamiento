require("dotenv").config();
const { CouplingLog } = require('../models/associations');
const BaseService = require('./Base.Service');

class CouplingLogsService {
    async create(data) {
        return await BaseService.create(CouplingLog, data);
    }
    async findAll() {
        return await BaseService.findAll(CouplingLog);
    }
    async findById(id) {
        return await BaseService.findById(CouplingLog, id);
    }
    async update(id, data) {
        return await BaseService.update(CouplingLog, id, data);
    }
    async remove(id) {
        return await BaseService.remove(CouplingLog, id);
    }
}
module.exports = new CouplingLogsService();