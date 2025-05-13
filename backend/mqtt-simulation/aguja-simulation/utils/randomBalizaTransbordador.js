// Función para generar una baliza aleatoria en los transbordadores 1-3
// y en las posiciones 1 a 8
const getRandomBalizaTransbordador = () => {
  let transbordador = Math.floor(Math.random() * 3) + 1;
  let posicion = Math.floor(Math.random() * 8) + 1;
  return `TRA${transbordador}_0${posicion}`;
};

// Exporta la función 'getRandomBalizaTransbordador' para que pueda ser utilizada en otros módulos.
module.exports = getRandomBalizaTransbordador;
