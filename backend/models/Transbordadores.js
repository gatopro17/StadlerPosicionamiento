const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transbordadores = sequelize.define(
  "Transbordadores",
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    acoplado: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tracker: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    via1: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    via2: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    balizaVirtual: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    timeStamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "transbordadores",
    timestamps: false,
  }
);

module.exports = Transbordadores;
