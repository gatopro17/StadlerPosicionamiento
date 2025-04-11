/**
 * Controlador para las operaciones CRUD del modelo Baliza.
 * Utiliza funciones base genéricas enlazadas al servicio de balizas.
 */
const { createController, findAllController, findByIdController, updateController, deleteController } = require('./Base.Controller');
const balizaService = require('../services/Balizas.Service');

const create = createController(balizaService.create);
const findAll = findAllController(balizaService.findAll);
const findById = findByIdController(balizaService.findById);
const update = updateController(balizaService.update);
const remove = deleteController(balizaService.remove);

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
