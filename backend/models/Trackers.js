const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Trackers = sequelize.define(
  "Trackers",
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tracker_id: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    activo_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "trackers",
    timestamps: false,
  }
);

module.exports = Trackers;
