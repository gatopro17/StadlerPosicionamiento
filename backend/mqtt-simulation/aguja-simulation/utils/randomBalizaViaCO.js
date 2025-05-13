// Función para generar una baliza aleatoria en las vías 1-4
//  Posiciones 1-4

const getRandomBalizaViaCO = () => {
  // Genera un número aleatorio entre 1 y 4 para la vía (C1, C2, C3 o C4)
  let via = Math.floor(Math.random() * 4) + 1;
  // Genera un número aleatorio entre 1 y 4 para la posición en la vía
  let posicion = Math.floor(Math.random() * 4) + 1;

  // Devuelve una cadena que representa la baliza aleatoria
  return `CO${via}_0${posicion}`;
};

// Exporta la función 'getRandomBalizaViaCO' para que pueda ser utilizada en otros módulos.
module.exports = getRandomBalizaViaCO;
