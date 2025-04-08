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
      throw new Error('No se recibieron balizas cercanas válidas');
    }
  
    // Ordenamos las balizas por intensidad ASC (menor valor = más fuerte)
    const balizasOrdenadas = balizasCercanas.sort((a, b) => a.intensidad - b.intensidad);
  
    // Si la más cercana tiene un minor bajo, asumimos que está en cabecera
    if (balizasOrdenadas[0].minor <= 3) {
      return {
        mayor: balizasOrdenadas[0].mayor,
        minor: balizasOrdenadas[0].minor
      };
    }
  
    // Si no, calculamos el promedio de las posiciones (minor) sobre el rail (mayor)
    const rail = balizasOrdenadas[0].mayor;
    const posicionPromedio = balizasOrdenadas.reduce((total, baliza) => total + baliza.minor, 0) / balizasOrdenadas.length;
  
    return {
      mayor: rail,
      minor: Math.round(posicionPromedio)
    };
  }
  
  module.exports = {
    encontrarPosicionTracker
  };
  