const conexionBD = (sequelize, app, port) => {
  sequelize.authenticate()
    .then(() => {
      console.log('✅ Conexión establecida correctamente.');

      return sequelize.sync({ force: false });
    })
    .then(() => {
      console.log('📦 Base de datos sincronizada');

      app.listen(port, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
      });
    })
    .catch(err => {
      console.error('❌ Error al conectar o sincronizar la base de datos:', err);
    });
};

module.exports = conexionBD;