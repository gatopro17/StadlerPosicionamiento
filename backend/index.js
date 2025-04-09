require("dotenv").config();
const express = require('express');
const cors = require('cors');
const routes = require("./routes/Routes");
const conexionBD = require("./database/ConexionBD");
const sequelize = require("./config/database");
require('./models/associations');




const app = express();
const port = process.env.PORT || 3000;

app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  // Middleware para parsear solicitudes JSON
app.use(express.json());

// Configuración de las rutas de la aplicación
app.use("/", routes);


// Establecer la conexión con la base de datos y sincronizarla
conexionBD(sequelize, app, port);
