// agujaProcessor.js

/**
 * Infers the most probable rails based on signal strength and switch states.
 * @param {Object} signalMap - Intensities from beacons, e.g., { 8: -70, 9: -60, 10: -80 }
 * @param {Object} switchStates - Current position of switches, e.g., { 1: 8, 2: 'continue', 3: 10, 4: 12, 5: 13 }
 * @param {Number} lastSwitchPassed - The last switch the tracker went through (1 to 5)
 * @returns {Number|null} - The inferred rails number, or null if undetermined
 */
function inferTrackLocation(signalMap, switchStates, lastSwitchPassed) {
    // 📌 Tabla de lógica para cada aguja según reglas definidas
    // Esta tabla contiene la lógica para determinar las posibles vías según el estado de cada aguja.
    const switchLogic = {
      1: { target: 8, next: 2}, // Aguja 1: desvío a 8, luego pasa a aguja 2
      2: { target: 9, next: 3}, // Aguja 2: desvío a 9, luego pasa a aguja 3r
      3: { target: 10, next: 4},  // Aguja 3: desvío a 10, luego pasa a aguja 4
      4: { target: 11, next: null}, // Aguja 4: desvíos a 11 o 12, 
      5: { target: 13, next: null} // Aguja 5: desvíos a 13 o 14, no hay siguiente
    };
  
    const strongestSignalRails = Object.entries(signalMap)
    .sort((a, b) => a[1] - b[1]) // Ordena las señales por intensidad, de menor a mayor (más fuerte es menor dBm)
    .map(([rails]) => parseInt(rails))[0];  // Extrae el número de vía correspondiente a la señal más fuerte
    // Si no se detecta ninguna señal válida, retorna null
  if (!strongestSignalRails) return null;

  
    // 🔁 Comienza desde la última aguja pasada hacia atrás (para determinar la vía correcta)
    if(strongestSignalRails <= 12 && strongestSignalRails >= 8){
     
        if( switchLogic[1].target === switchStates[1] ){
         return switchStates[1]; // Si la aguja 1 está en la vía 8, retorna 8
      }else if( switchLogic[2].target === switchStates[2] ){
          return switchStates[2]; // Si la aguja 2 está en la vía 9, retorna 9
      }else if( switchLogic[3].target === switchStates[3] ){
          return switchStates[3]; // Si la aguja 3 está en la vía 10, retorna 10
      }else{
          return switchStates[4]; // la aguja 4 retorna la via en la que está
      } 
    }else if(strongestSignalRails >= 13){
        // La aguja 5 retorna la vía en la que está
          return switchStates[5];
    }else{
      return null; // 🚫 Si no se puede determinar la vía, retorna null
      }
  
    
  }
  
  module.exports = { inferTrackLocation };

  
  