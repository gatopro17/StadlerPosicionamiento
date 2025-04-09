const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definición del modelo Balizas
const Balizas = sequelize.define('Balizas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mayor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  minor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'balizas', 
  timestamps: false, 
});


module.exports = Balizas;