const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rails = sequelize.define('Rails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  coordinates: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'rails',
  timestamps: false,
});

module.exports = Rails;
