const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activos = sequelize.define('Activos', {
  activo_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'activos',
  timestamps: false,
});

module.exports = Activos;
