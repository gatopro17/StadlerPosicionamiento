const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transbordadores = sequelize.define(
  "Transbordadores",
  {
    id: {
<<<<<<< Updated upstream
      type: DataTypes.STRING(10),
=======
      type: DataTypes.STRING(4),
>>>>>>> Stashed changes
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    acoplado: {
<<<<<<< Updated upstream
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    tracker: {
      type: DataTypes.STRING(10),
=======
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    tracker: {
      type: DataTypes.STRING(5),
>>>>>>> Stashed changes
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    via: {
<<<<<<< Updated upstream
      type: DataTypes.STRING(10),
=======
      type: DataTypes.STRING(3),
>>>>>>> Stashed changes
      allowNull: true,
    },
  },
  {
    tableName: "transbordadores",
    timestamps: false,
  }
);

module.exports = Transbordadores;
