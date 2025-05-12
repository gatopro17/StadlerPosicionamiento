const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Balizas = sequelize.define(
  "Balizas",
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    balizaid: {
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
  },
  {
    tableName: "balizas",
    timestamps: false,
  }
);

module.exports = Balizas;
