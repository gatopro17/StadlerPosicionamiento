const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trackers = sequelize.define('Trackers', {
  id: {
    type: DataTypes.STRING(5),
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tracker_id: {
    type: DataTypes.STRING(5),
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'trackers',
  timestamps: false,
});

module.exports = Trackers;
