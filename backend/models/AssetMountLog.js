// models/AssetMountLog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const AssetMountLog = sequelize.define('AssetMountLog', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      assetId: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      mountedOnId: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      rssi: {
        type: DataTypes.INTEGER
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'assetMountLogs',
      timestamps: false
    });
  
    module.exports = AssetMountLog;