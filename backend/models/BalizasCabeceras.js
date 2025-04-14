const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BalizasCabeceras = sequelize.define('BalizasCabeceras', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  railId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'balizasCabeceras',
  timestamps: false,
});

module.exports = BalizasCabeceras;
