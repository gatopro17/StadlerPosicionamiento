/**
 * Crea un controlador para crear un recurso.
 * @param {Function} serviceMethod - Método del servicio que maneja la creación.
 * @returns {Function} Middleware Express para manejar la solicitud POST.
 */
const createController = (serviceMethod) => async (req, res) => {
  try {
    const data = req.body;
    const result = await serviceMethod(data);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/**
* Crea un controlador para obtener todos los recursos.
* @param {Function} serviceMethod - Método del servicio que obtiene todos los registros.
* @returns {Function} Middleware Express para manejar la solicitud GET.
*/
const findAllController = (serviceMethod) => async (req, res) => {
  try {
    const result = await serviceMethod();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * Crea un controlador para obtener un recurso por su ID.
 * @param {Function} serviceMethod - Método del servicio que obtiene un registro por ID.
 * @returns {Function} Middleware Express para manejar la solicitud GET con parámetro ID.
 */
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
/**
 * Crea un controlador para actualizar un recurso existente.
 * @param {Function} serviceMethod - Método del servicio que actualiza un registro.
 * @returns {Function} Middleware Express para manejar la solicitud PUT o PATCH.
 */
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
/**
 * Crea un controlador para eliminar un recurso por su ID.
 * @param {Function} serviceMethod - Método del servicio que elimina un registro por ID.
 * @returns {Function} Middleware Express para manejar la solicitud DELETE.
 */
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
