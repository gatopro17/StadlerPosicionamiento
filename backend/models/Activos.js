const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Activos = sequelize.define(
  "Activos",
  {
    activo_id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    baliza_actual: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    via_actual: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    posible_via: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    posible_via2: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    trucker: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    tableName: "activos",
    timestamps: false,
  }
);

module.exports = Activos;
