// agujaProcessor.js

/**
 * Infers the most probable rail based on signal strength and switch states.
 * @param {Object} signalMap - Intensities from beacons, e.g., { 8: -70, 9: -60, 10: -80 }
 * @param {Object} switchStates - Current position of switches, e.g., { 1: 8, 2: 'continue', 3: 10, 4: 12, 5: 13 }
 * @param {Number} lastSwitchPassed - The last switch the tracker went through (1 to 5)
 * @returns {Number|null} - The inferred rail number, or null if undetermined
 */
function inferTrackLocation(signalMap, switchStates, lastSwitchPassed) {
    // 📌 Tabla de lógica para cada aguja según reglas definidas
    // Esta tabla contiene la lógica para determinar las posibles vías según el estado de cada aguja.
    const switchLogic = {
      1: { target: 8, next: 2, candidates: [8, 9] }, // Aguja 1: desvío a 8, luego pasa a aguja 2
      2: { target: 9, next: 3, candidates: [8, 9, 10] }, // Aguja 2: desvío a 9, luego pasa a aguja 3
      3: { target: 10, next: 4, candidates: [9, 10, 11] },  // Aguja 3: desvío a 10, luego pasa a aguja 4
      4: { target: [11, 12], next: 5, candidates: [10, 11, 12] }, // Aguja 4: desvíos a 11 o 12, luego pasa a aguja 5
      5: { target: [13, 14], next: null, candidates: [13, 14] } // Aguja 5: desvíos a 13 o 14, no hay siguiente
    };
  
        // 🔍 Identificamos la señal más fuerte: la señal con el valor dBm más bajo es la más fuerte
    const strongestSignalRail = Object.entries(signalMap)
      .sort((a, b) => a[1] - b[1]) // Ordena las señales por intensidad, de menor a mayor (más fuerte es menor dBm)
      .map(([rail]) => parseInt(rail))[0];  // Extrae el número de vía correspondiente a la señal más fuerte
      // Si no se detecta ninguna señal válida, retorna null
    if (!strongestSignalRail) return null;
  
    // 🔁 Comienza desde la última aguja pasada hacia atrás (para determinar la vía correcta)
    for (let sw = lastSwitchPassed; sw >= 1; sw--) {
      const logic = switchLogic[sw];  // Obtiene la lógica asociada a la aguja actual
      let state = switchStates[sw];  // Obtiene el estado de la aguja (puede ser un número o 'continue')

        // Si el estado de la aguja es una cadena y no es 'continue', lo convierte a número
    if (typeof state === 'string' && state !== 'continue') state = parseInt(state);
  
       // 🧠 Aguja 4 y 5 tienen dos posibles desvíos, por lo que la lógica cambia para esos casos
      if (Array.isArray(logic.target)) {
        // Si la aguja tiene más de un destino posible
        if (logic.target.includes(state)) { // Si el estado de la aguja coincide con uno de los destinos
                    // Si el estado de la aguja coincide con la señal más fuerte, lo devuelve
          if (state === strongestSignalRail) return state;
           // Si el estado de la aguja es un candidato y coincide con la señal más fuerte, lo devuelve
          if (logic.target.includes(strongestSignalRail)) return strongestSignalRail;
                    // Si la señal más fuerte es uno de los candidatos, lo devuelve
          if (logic.candidates.includes(strongestSignalRail)) return strongestSignalRail;
        }
      } else {
         // 🧠 Agujas normales con un solo desvío y posibilidad de continuar
        if (state === logic.target) {
           // Si el estado de la aguja coincide con el destino, lo devuelve
          if (strongestSignalRail === state) return state;
          if (logic.candidates.includes(strongestSignalRail)) return state;
        } else if (state === 'continue' && logic.next) {
            // Si el estado de la aguja es 'continue', pasa a la siguiente aguja
          const nextState = switchStates[logic.next];  // Obtiene el estado de la siguiente aguja
          const nextLogic = switchLogic[logic.next];  // Obtiene la lógica de la siguiente aguja
  
                    // Si no existe lógica para la siguiente aguja, pasa al siguiente ciclo
          if (!nextLogic) continue;

          if (Array.isArray(nextLogic?.target)) {
              // Si la siguiente aguja tiene varios destinos posibles
           if (nextLogic.target.includes(nextState)) {
            if (nextState === strongestSignalRail) return nextState;
            if (nextLogic.target.includes(strongestSignalRail)) return strongestSignalRail;
            if (nextLogic.candidates.includes(strongestSignalRail)) return strongestSignalRail;
          }
          } else {
              // Si la siguiente aguja tiene un solo destino
            if (nextState === strongestSignalRail) return nextState;
            if (nextLogic?.candidates.includes(strongestSignalRail)) return nextState;
          }
        }
      }
    }
  
    return null; // 🚫 Si no se puede determinar la vía, retorna null
  }
  
  module.exports = { inferTrackLocation };

  
  