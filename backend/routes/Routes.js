const express = require('express');
const router = express.Router();


const railsController = require('../controllers/Rails.Controller');
const balizaController = require('../controllers/Balizas.Controller');
const trackerController = require('../controllers/Tracker.Controller');

// Rutas para Rails
router.post('/rails', railsController.create);        // Crear Rails
router.get('/rails', railsController.findAll);       // Obtener todos los Rails
router.get('/rails/:id', railsController.findById);  // Obtener Rails por ID
router.put('/rails/:id', railsController.update);    // Actualizar Rails
router.delete('/rails/:id', railsController.remove); // Eliminar Rails

// Rutas para Baliza
router.post('/balizas', balizaController.create);        // Crear Baliza
router.get('/balizas', balizaController.findAll);       // Obtener todas las Balizas
router.get('/balizas/:id', balizaController.findById);  // Obtener Baliza por ID
router.put('/balizas/:id', balizaController.update);    // Actualizar Baliza
router.delete('/balizas/:id', balizaController.remove); // Eliminar Baliza

// Rutas para Tracker
router.post('/trackers', trackerController.create);        // Crear Tracker
router.get('/trackers', trackerController.findAll);       // Obtener todos los Trackers
router.get('/trackers/:id', trackerController.findById);  // Obtener Tracker por ID
router.put('/trackers/:id', trackerController.update);    // Actualizar Tracker
router.delete('/trackers/:id', trackerController.remove); // Eliminar Tracker

module.exports = router;
