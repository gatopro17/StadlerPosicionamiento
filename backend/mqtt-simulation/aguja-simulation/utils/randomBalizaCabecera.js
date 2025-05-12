// Función para generar una baliza aleatoria en las vías 1 a 7
// y en las posiciones 1 a 2
const getRandomBalizaCabecera = () => {
  let via = Math.floor(Math.random() * 7) + 1;
  let posicion = Math.floor(Math.random() * 2) + 1;
  return `C0${via}C${posicion}`;
};

// Exporta la función 'getRandomBalizaCabecera' para que pueda ser utilizada en otros módulos.
module.exports = getRandomBalizaCabecera;
