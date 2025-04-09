const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo TrackerLogs
const TrackerLogs = sequelize.define('TrackerLogs', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  trackerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(145),
    allowNull: true,
  },
  mayor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  minor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'trackerLogs', 
  timestamps: false, 
});



module.exports = TrackerLogs;