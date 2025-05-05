const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrackerPositionLogs = sequelize.define('TrackerPositionLogs', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  trackerId: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  trackerName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  rail: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  beaconId: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  rssi: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'trackerPositionlogs',
  timestamps: false,
});

module.exports = TrackerPositionLogs;
