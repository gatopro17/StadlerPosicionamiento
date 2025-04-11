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

// Asociaciones entre Rail y Balizas
/**
 * Define la relación de uno a muchos entre 'Rail' y 'Balizas', 
 * donde un 'Rail' puede tener muchas 'Balizas'.
 * 
 * @name Rail.hasMany(Balizas)
 * @function
 * @param {Object} options - Configuración adicional para la asociación.
 * @param {string} options.foreignKey - El campo en 'Balizas' que actúa como clave foránea.
 * @param {string} options.as - El alias de la relación.
 */
Rail.hasMany(Balizas, { foreignKey: 'mayor', as: 'balizas' });

/**
 * Define la relación de muchos a uno entre 'Balizas' y 'Rail', 
 * donde cada 'Baliza' pertenece a un 'Rail'.
 * 
 * @name Balizas.belongsTo(Rail)
 * @function
 * @param {Object} options - Configuración adicional para la asociación.
 * @param {string} options.foreignKey - El campo en 'Balizas' que actúa como clave foránea.
 * @param {string} options.as - El alias de la relación.
 */
Balizas.belongsTo(Rail, { foreignKey: 'mayor', as: 'rail' });

// Asociaciones entre Rail y TrackerLogs
/**
 * Define la relación de uno a muchos entre 'Rail' y 'TrackerLogs', 
 * donde un 'Rail' puede tener muchos 'TrackerLogs'.
 * 
 * @name Rail.hasMany(TrackerLogs)
 * @function
 * @param {Object} options - Configuración adicional para la asociación.
 * @param {string} options.foreignKey - El campo en 'TrackerLogs' que actúa como clave foránea.
 * @param {string} options.as - El alias de la relación.
 */
Rail.hasMany(TrackerLogs, { foreignKey: 'mayor', as: 'trackerLogs' });

/**
 * Define la relación de muchos a uno entre 'TrackerLogs' y 'Rail', 
 * donde cada 'TrackerLog' pertenece a un 'Rail'.
 * 
 * @name TrackerLogs.belongsTo(Rail)
 * @function
 * @param {Object} options - Configuración adicional para la asociación.
 * @param {string} options.foreignKey - El campo en 'TrackerLogs' que actúa como clave foránea.
 * @param {string} options.as - El alias de la relación.
 */
TrackerLogs.belongsTo(Rail, { foreignKey: 'mayor', as: 'rail' });

module.exports = {
  
  Rail,
  Balizas,
  TrackerLogs,
};
