const { Sequelize } = require("sequelize");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

/**
 * Configuración de la conexión a la base de datos utilizando Sequelize.
 *
 * @constant {Sequelize} sequelize - La instancia de Sequelize configurada para la conexión a la base de datos.
 */
const sequelize = new Sequelize( DB_NAME , DB_USER , DB_PASSWORD, {
  //host: '192.168.10.113',
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
  timezone: "+01:00",
});

module.exports = sequelize;
