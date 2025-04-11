/**
 * Controladores para el modelo Rail, utilizando controladores base reutilizables.
 * Cada función usa un método del servicio correspondiente para realizar operaciones CRUD.
 */
const { createController, findAllController, findByIdController, updateController, deleteController } = require('./Base.Controller');
const railService = require('../services/Rail.Service');

const create = createController(railService.create);
const findAll = findAllController(railService.findAll);
const findById = findByIdController(railService.findById);
const update = updateController(railService.update);
const remove = deleteController(railService.remove);

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
