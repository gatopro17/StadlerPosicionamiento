const { createController, findAllController, findByIdController, updateController, deleteController } = require('./Base.Controller');
const trackerService = require('../services/Tracker.Service');

const create = createController(trackerService.create);
const findAll = findAllController(trackerService.findAll);
const findById = findByIdController(trackerService.findById);
const update = updateController(trackerService.update);
const remove = deleteController(trackerService.remove);

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
