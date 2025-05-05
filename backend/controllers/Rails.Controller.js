/**
 * Controladores para el modelo Rails, utilizando controladores base reutilizables.
 * Cada función usa un método del servicio correspondiente para realizar operaciones CRUD.
 */
const { createController, findAllController, findByIdController, updateController, deleteController } = require('./Base.Controller');
const railsService = require('../services/Rails.Service');

const create = createController(railsService.create);
const findAll = findAllController(railsService.findAll);
const findById = findByIdController(railsService.findById);
const update = updateController(railsService.update);
const remove = deleteController(railsService.remove);

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
