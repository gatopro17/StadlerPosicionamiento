const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssetMountLogs = sequelize.define('AssetMountLogs', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  asset: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  mountedOn: {
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
  tableName: 'assetMountLogs',
  timestamps: false,
});

module.exports = AssetMountLogs;
