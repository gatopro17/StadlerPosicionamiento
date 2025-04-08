const express = require('express');
const router = express.Router();


const railController = require('../controllers/Rail.Controller');
const balizaController = require('../controllers/Balizas.Controller');
const trackerController = require('../controllers/Tracker.Controller');

// Rutas para Rail
router.post('/rails', railController.create);        // Crear Rail
router.get('/rails', railController.findAll);       // Obtener todos los Rails
router.get('/rails/:id', railController.findById);  // Obtener Rail por ID
router.put('/rails/:id', railController.update);    // Actualizar Rail
router.delete('/rails/:id', railController.remove); // Eliminar Rail

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
