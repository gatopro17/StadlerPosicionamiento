const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


// Definición del modelo Rail
const Rail = sequelize.define('Rail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
}, {
  tableName: 'rail', 
  timestamps: false, 
});



module.exports = Rail;