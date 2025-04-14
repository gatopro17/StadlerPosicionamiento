const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrackerActivos = sequelize.define('TrackerActivos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'trackerActivos',
  timestamps: false,
});

module.exports = TrackerActivos;
