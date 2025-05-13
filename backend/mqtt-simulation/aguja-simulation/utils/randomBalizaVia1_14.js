// Función para generar una baliza aleatoria en las vías 1 a 14
// y en las posiciones 1 a 8
const getRandomBalizaVia1_14 = () => {
  let via = Math.floor(Math.random() * 14) + 1;
  let posicion = Math.floor(Math.random() * 8) + 1;
  if (via < 10) {
    via = `0${via}`;
  }
  return `C${via}_0${posicion}`;
};

// Exporta la función 'getRandomBalizaVia1_14' para que pueda ser utilizada en otros módulos.
module.exports = getRandomBalizaVia1_14;
