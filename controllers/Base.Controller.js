// controllers/baseController.js

const createController = (serviceMethod) => async (req, res) => {
    try {
      const data = req.body;
      const result = await serviceMethod(data);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const findAllController = (serviceMethod) => async (req, res) => {
    try {
      const result = await serviceMethod();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const findByIdController = (serviceMethod) => async (req, res) => {
    try {
      const { id } = req.params;
      const result = await serviceMethod(id);
      if (!result) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const updateController = (serviceMethod) => async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await serviceMethod(id, data);
      if (!result) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const deleteController = (serviceMethod) => async (req, res) => {
    try {
      const { id } = req.params;
      const result = await serviceMethod(id);
      if (!result) return res.status(404).json({ message: 'Not found' });
      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    createController,
    findAllController,
    findByIdController,
    updateController,
    deleteController,
  };
  