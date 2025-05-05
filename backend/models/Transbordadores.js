const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transbordadores = sequelize.define('Transbordadores', {
  id: {
    type: DataTypes.STRING(4),
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  acoplado: {
    type: DataTypes.STRING(4),
    allowNull: true,
  },
  tracker: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  via: {
    type: DataTypes.STRING(3),
    allowNull: true,
  },
  parado: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'transbordadores',
  timestamps: false,
});

module.exports = Transbordadores;
