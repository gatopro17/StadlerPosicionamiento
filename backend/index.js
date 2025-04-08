
const express = require('express');
const cors = require('cors');
const routes = require("./routes/Routes");
const conexionBD = require("./database/ConexionBD");
const sequelize = require("./config/database");
require("dotenv").config();
const { obtenerPoligonosYLines } = require('./turf/turf.js');



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

// Endpoint para obtener los polígonos y líneas de los rails
app.get('/api/poligonos', (req, res) => {
  try {
    const data = obtenerPoligonosYLines();
    res.json(data);  // Devuelve la información de los polígonos y las líneas
  } catch (error) {
    console.error('Error al obtener los polígonos:', error);
    res.status(500).json({ error: 'Error al obtener los polígonos' });
  }
});

// Establecer la conexión con la base de datos y sincronizarla
conexionBD(sequelize, app, port);
