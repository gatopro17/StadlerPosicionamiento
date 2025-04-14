const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Agujas = sequelize.define('Agujas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  localizacion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  viaOrigen: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  viaDestino1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  viaDestino2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  posicionActual: {
    type: DataTypes.ENUM('viaDestino1', 'viaDestino2'),
    allowNull: false,
  },
}, {
  tableName: 'agujas',
  timestamps: false,
});

module.exports = Agujas;
