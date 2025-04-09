
require("dotenv").config();

const create = async (Model, data) => {
    try {
      const newRecord = await Model.create(data);
      return newRecord;
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  };
  
  const findAll = async (Model, include = []) => {
    try {
      const records = await Model.findAll({ include });
      return records;
    } catch (error) {
      throw new Error(`Error fetching records: ${error.message}`);
    }
  };
  
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
  