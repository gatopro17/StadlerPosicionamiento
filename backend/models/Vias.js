const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vias = sequelize.define('Vias', {
  id: {
    type: DataTypes.STRING(3),
    primaryKey: true,
  },
}, {
  tableName: 'vias',
  timestamps: false,
});

module.exports = Vias;

