const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BalizasTransbordador = sequelize.define('BalizasTransbordador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  posicion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trackerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'balizasTransbordador',
  timestamps: false,
});

module.exports = BalizasTransbordador;
