const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Polygons = sequelize.define('Polygons', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  coordinates: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'polygons',
  timestamps: false,
});

module.exports = Polygons;
