const { Sequelize } = require("sequelize");
require("dotenv").config({ path: "./backend/.env" });

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);

/**
 * Configuración de la conexión a la base de datos utilizando Sequelize.
 *
 * @constant {Sequelize} sequelize - La instancia de Sequelize configurada para la conexión a la base de datos.
 */
const sequelize = new Sequelize("stadler", "Segula", "Segula01#", {
  //host: '192.168.0.199',
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  logging: false,
  timezone: "+01:00",
});

module.exports = sequelize;
