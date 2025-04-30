// models/CouplingLogs.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

    const CouplingLogs = sequelize.define('CouplingLogs', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tracker1Id: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      tracker2Id: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      rail: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      rssiDifference: {
        type: DataTypes.INTEGER
      },
      timestampDiffMs: {
        type: DataTypes.INTEGER
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'couplingLogs',
      timestamps: false
    });
  
    module.exports = CouplingLogs;
  