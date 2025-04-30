/**
 * Establece la conexión con la base de datos y sincroniza el modelo.
 * Luego, inicia el servidor en el puerto especificado.
 * 
 * @param {Object} sequelize - Instancia de Sequelize para interactuar con la base de datos.
 * @param {Object} app - Instancia de la aplicación Express.
 * @param {number} port - El puerto en el que se ejecutará el servidor.
 * 
 * @returns {void} No retorna ningún valor, pero realiza conexiones y sincronización.
 */
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