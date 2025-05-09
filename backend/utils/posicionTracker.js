// utils/posicionTracker.js

/**
 * Determina la posición del tracker a partir de las balizas más cercanas.
 * Se basa en la intensidad de señal y en la posición relativa de las balizas.
 *
 * @param {Array} balizasCercanas - Lista de balizas con formato: { mayor, minor, intensidad }
 * @returns {Object} Posición estimada del tracker { mayor, minor }
 */
async function encontrarPosicionTracker(balizasCercanas) {
  if (!Array.isArray(balizasCercanas) || balizasCercanas.length === 0) {
    throw new Error("No se recibieron balizas cercanas válidas");
  }

  // Ordenamos las balizas por intensidad ASC (menor valor = más fuerte)
  const balizasOrdenadas = balizasCercanas.sort(
    (a, b) => parseFloat(b.intensidad) - parseFloat(a.intensidad)
  );

  console.log("Balizas ordenadas por intensidad:", balizasOrdenadas);
  return {
    id: balizasOrdenadas[0].id,
    nombre: balizasOrdenadas[0].nombre,
    via: balizasOrdenadas[0].via,
    minor: balizasOrdenadas[0].minor,
    trackerId: balizasOrdenadas[0].trackerId,
  };
}

module.exports = {
  encontrarPosicionTracker,
};
