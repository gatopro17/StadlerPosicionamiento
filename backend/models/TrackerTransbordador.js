const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrackerTransbordador = sequelize.define('TrackerTransbordador', {
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
  tableName: 'trackerTransbordador',
  timestamps: false,
});

module.exports = TrackerTransbordador;
