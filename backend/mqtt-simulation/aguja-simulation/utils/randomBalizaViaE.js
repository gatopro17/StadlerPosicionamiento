// Función para generar una baliza aleatoria en las vías E1L, E1C, E2L, E2C.
//  Las L tienen 8 posiciones y las C tienen 4 pos

const getRandomBalizaViaE = () => {
  let ECL = Math.floor(Math.random() * 2) + 1;
  // Genera un número aleatorio entre 1 y 2 para determinar la vía (E1 o E2)
  let via = Math.floor(Math.random() * 2) + 1;
  // Genera un número aleatorio entre 1 y 8 para la posición en la vía L
  let posicionL = Math.floor(Math.random() * 8) + 1;
  // Genera un número aleatorio entre 1 y 4 para la posición en la vía C
  let posicionC = Math.floor(Math.random() * 4) + 1;

  // Devuelve una cadena que representa la baliza aleatoria
  if (ECL === 1) {
    // Si ECL es 1, devuelve la baliza en la vía L
    return `E${via}L_0${posicionL}`;
  } else {
    // Si ECL es 2, devuelve la baliza en la vía C
    return `E${via}C_0${posicionC}`;
  }
};

// Exporta la función 'getRandomBalizaViaE' para que pueda ser utilizada en otros módulos.
module.exports = getRandomBalizaViaE;
