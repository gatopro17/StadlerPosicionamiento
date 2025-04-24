// models/TrackerPositionLogs.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const TrackerPositionLogs = sequelize.define('TrackerPositionLogs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      trackerId: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      trackerName: {
        type: DataTypes.STRING(100)
      },
      rail: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      beaconId: {
        type: DataTypes.STRING(50)
      },
      rssi: {
        type: DataTypes.INTEGER
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'trackerPositionLogs',
      timestamps: false
    });
  
    module.exports = TrackerPositionLogs;
  