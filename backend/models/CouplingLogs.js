const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CouplingLogs = sequelize.define('CouplingLogs', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  tracker1Id: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  tracker2Id: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  rails: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  rssiDifference: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  timestampDiffMs: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'couplingLogs',
  timestamps: false,
});

module.exports = CouplingLogs;
