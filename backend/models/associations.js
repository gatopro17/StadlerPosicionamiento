/**
 * Este archivo se encarga de definir las asociaciones entre los modelos de Sequelize.
 * Las asociaciones permiten a Sequelize gestionar las relaciones entre las tablas 
 * de manera sencilla y optimizada.
 * 
 * @module Associations
 */

const Rail = require('./Rails');
const Balizas = require('./Balizas');
const TrackerLogs = require('./Transbordadores');
const TrackerTransbordador = require('./TrackerTransbordador');
const BalizasTransbordador = require('./BalizasTransbordador');
const TrackerActivos = require('./Activos');
const Agujas = require('./Agujas');
const TrackerPositionLogs = require('./TrackerPositionLogs');
const CouplingLogs = require('./CouplingLogs');
const Transbordadores = require('./Transbordadores');
const Trackers = require('./Trackers');
const Vias = require('./Vias');

// --- Asociación: transbordadores.acoplado -> transbordadores.id (self-association)
Transbordadores.belongsTo(Transbordadores, {
  foreignKey: 'acoplado',
  as: 'Acoplado',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// --- Asociación: transbordadores.tracker -> trackers.id
Transbordadores.belongsTo(Trackers, {
  foreignKey: 'tracker',
  as: 'Tracker',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// --- Asociación: transbordadores.via -> vias.id
Transbordadores.belongsTo(Vias, {
  foreignKey: 'via',
  as: 'Via',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

// --- Asociación: balizas.via -> vias.id
Balizas.belongsTo(Vias, {
  foreignKey: 'via',
  as: 'Via',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});



// Asociaciones entre Rail y Balizas

Rail.hasMany(Balizas, { foreignKey: 'mayor', as: 'balizas' });


Balizas.belongsTo(Rail, { foreignKey: 'mayor', as: 'rail' });

// Asociaciones entre Rail y TrackerLogs

Rail.hasMany(TrackerLogs, { foreignKey: 'mayor', as: 'trackerLogs' });


TrackerLogs.belongsTo(Rail, { foreignKey: 'mayor', as: 'rail' });


// Relación TrackerTransbordador -> BalizasTransbordador (1:N)
TrackerTransbordador.hasMany(BalizasTransbordador, { foreignKey: 'trackerId', as: 'balizas' });
BalizasTransbordador.belongsTo(TrackerTransbordador, { foreignKey: 'trackerId', as: 'tracker' });


module.exports = {
  
  Rail,
  Balizas,
  TrackerLogs,
  TrackerTransbordador,
  BalizasTransbordador,
  TrackerActivos,
  Agujas,
  TrackerPositionLogs,
  CouplingLogs,
  Transbordadores,
  Trackers,
  Vias
};
