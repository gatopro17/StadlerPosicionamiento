const conexionBD = (sequelize, app, port) => {
  sequelize.sync({ force: false }).then(() => {
      console.log('Base de datos sincronizada');
      app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
      });
  }).catch(err => {
      console.error('No se pudo conectar a la base de datos:', err);
  });
}

module.exports = conexionBD;