const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Agujas = sequelize.define(
  "Agujas",
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    via_origen: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    destinoA: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    destinoB: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
  },
  {
    tableName: "agujas",
    timestamps: false,
  }
);

module.exports = Agujas;
