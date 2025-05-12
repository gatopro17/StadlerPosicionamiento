// Función para generar una intensidad de señal aleatoria dentro de un rango dado (por defecto entre -90 y -30 dBm).
const getRandomIntensity = (min = -90, max = -30) => {
  // Genera un número aleatorio entre 'min' y 'max' (incluyendo ambos extremos).
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Exporta la función 'getRandomIntensity' para que pueda ser utilizada en otros módulos.
module.exports = getRandomIntensity;
