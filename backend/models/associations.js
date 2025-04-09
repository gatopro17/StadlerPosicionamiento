const sequelize = require('../config/database');
const Rail = require('./Rail');
const Balizas = require('./Balizas');
const TrackerLogs = require('./TrackerLogs');

// Asociaciones
Rail.hasMany(Balizas, { foreignKey: 'mayor', as: 'balizas' });
Balizas.belongsTo(Rail, { foreignKey: 'mayor', as: 'rail' });

Rail.hasMany(TrackerLogs, { foreignKey: 'mayor', as: 'trackerLogs' });
TrackerLogs.belongsTo(Rail, { foreignKey: 'mayor', as: 'rail' });

module.exports = {
  sequelize,
  Rail,
  Balizas,
  TrackerLogs,
};
