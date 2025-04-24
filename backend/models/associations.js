/**
 * Este archivo se encarga de definir las asociaciones entre los modelos de Sequelize.
 * Las asociaciones permiten a Sequelize gestionar las relaciones entre las tablas 
 * de manera sencilla y optimizada.
 * 
 * @module Associations
 */

const Rail = require('./Rail');
const Balizas = require('./Balizas');
const TrackerLogs = require('./TrackerLogs');
const TrackerTransbordador = require('./TrackerTransbordador');
const BalizasTransbordador = require('./BalizasTransbordador');
const TrackerActivos = require('./TrackerActivos');
const Agujas = require('./Agujas');
const TrackerPositionLogs = require('./TrackerPositionLogs');


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
  TrackerPositionLogs
};
