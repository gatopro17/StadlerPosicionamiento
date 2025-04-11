// Servicio base para operaciones CRUD en modelos de Sequelize
require("dotenv").config();
/**
 * Crea un nuevo registro en el modelo proporcionado.
 * 
 * @param {Object} Model - El modelo de Sequelize en el que se creará el registro.
 * @param {Object} data - Los datos del nuevo registro a crear.
 * @returns {Promise<Object>} El nuevo registro creado.
 * @throws {Error} Si ocurre un error durante la creación del registro.
 */
const create = async (Model, data) => {
    try {
      const newRecord = await Model.create(data);
      return newRecord;
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  };

  /**
 * Obtiene todos los registros de un modelo, con la posibilidad de incluir relaciones.
 * 
 * @param {Object} Model - El modelo de Sequelize del que se recuperarán los registros.
 * @param {Array} [include=[]] - Un array de asociaciones para incluir en la consulta (opcional).
 * @returns {Promise<Array>} Un array de registros encontrados.
 * @throws {Error} Si ocurre un error durante la obtención de los registros.
 */
  const findAll = async (Model, include = []) => {
    try {
      const records = await Model.findAll({ include });
      return records;
    } catch (error) {
      throw new Error(`Error fetching records: ${error.message}`);
    }
  };

  /**
 * Obtiene un registro específico por su ID, con la posibilidad de incluir relaciones.
 * 
 * @param {Object} Model - El modelo de Sequelize del que se obtendrá el registro.
 * @param {number} id - El ID del registro a recuperar.
 * @param {Array} [include=[]] - Un array de asociaciones para incluir en la consulta (opcional).
 * @returns {Promise<Object|null>} El registro encontrado o `null` si no se encuentra.
 * @throws {Error} Si ocurre un error durante la obtención del registro.
 */
  const findById = async (Model, id, include = []) => {
    try {
      const record = await Model.findByPk(id, { include });
      if (!record) {
        throw new Error('Record not found');
      }
      return record;
    } catch (error) {
      throw new Error(`Error fetching record: ${error.message}`);
    }
  };
  
  /**
 * Actualiza un registro existente en el modelo con los nuevos datos.
 * 
 * @param {Object} Model - El modelo de Sequelize del que se actualizará el registro.
 * @param {number} id - El ID del registro a actualizar.
 * @param {Object} data - Los nuevos datos para actualizar el registro.
 * @returns {Promise<Object>} El registro actualizado.
 * @throws {Error} Si ocurre un error durante la actualización del registro.
 */
  const update = async (Model,id,  data) => {
    try {
      const record = await Model.findByPk(id);
      if (!record) {
        throw new Error('Record not found');
      }
      await record.update(data);
      return record;
    } catch (error) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  };
  
  /**
 * Elimina un registro en el modelo por su ID.
 * 
 * @param {Object} Model - El modelo de Sequelize del que se eliminará el registro.
 * @param {number} id - El ID del registro a eliminar.
 * @returns {Promise<Object>} El registro eliminado.
 * @throws {Error} Si ocurre un error durante la eliminación del registro.
 */
  const remove = async (Model, id) => {
    try {
      const record = await Model.findByPk(id);
      if (!record) {
        throw new Error('Record not found');
      }
      await record.destroy();
      return record;
    } catch (error) {
      throw new Error(`Error deleting record: ${error.message}`);
    }
  };
  
  module.exports = {
    create,
    findAll,
    findById,
    update,
    remove,
  };
  