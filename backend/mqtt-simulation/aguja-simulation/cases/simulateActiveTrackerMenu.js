// Importa la librería MQTT para conectarse al broker
const mqtt = require('mqtt');
// Importa readline para poder interactuar con el usuario desde la consola
const readline = require('readline');
// Crea una conexión al broker MQTT local
const client = mqtt.connect('mqtt://localhost:1883');
// Importa la función que infiere la vía del tracker a partir de señales y desvíos
const { inferTrackLocation } = require('../utils/AgujaProcessor');

// Configura la interfaz de entrada y salida por consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// Define un conjunto de casos predefinidos para simular diferentes situaciones de trackers
const cases = {
  '1': {
    trackerId: 'T-V9',
    lastSwitchPassed: 2,
    switchStates: { 1: 8, 2: 9, 3: 'continue', 4: 11, 5: 13 },
    signalMap: { 8: -85, 9: -60, 10: -75 },
  },
  '2': {
    trackerId: 'T-V12',
    lastSwitchPassed: 4,
    switchStates: { 1: 8, 2: 'continue', 3: 'continue', 4: 12 },
    signalMap: { 11: -78, 12: -85 },
  },
  '3': {
    trackerId: 'T-V14',
    lastSwitchPassed: 5,
    switchStates: { 1: 8, 2: 'continue', 3: 'continue', 4: 'continue', 5: 14 },
    signalMap: { 13: -82, 14: -58 },
  },
};
// Función que infiere la vía y publica el mensaje MQTT con los datos del tracker
function sendMessage(payload) {
  const inferredRail = inferTrackLocation(payload.signalMap, payload.switchStates, payload.lastSwitchPassed);
  // Muestra por consola la vía inferida
  console.log(`📍 Inferred Rail for ${payload.trackerId}: ${inferredRail !== null ? inferredRail : 'No pudo determinarse'}`);
  // Publica el mensaje en el topic 'simulation/tracker'
  client.publish('simulation/tracker', JSON.stringify(payload), {}, () => {
    console.log(`✅ Enviado: ${payload.trackerId}`);
    rl.close();
    client.end();
  });
}

// Función para pedir al usuario que ingrese un caso personalizado desde consola
function askCustomCase() {
  const customCase = {};
  // Paso 1: Solicita el ID del tracker
  rl.question('🆔 Tracker ID: ', (id) => {
    customCase.trackerId = id;
    // Paso 2: Solicita el último desvío pasado
    rl.question('🔁 Último desvío pasado (número del 1 al 5): ', (lastSwitch) => {
      customCase.lastSwitchPassed = parseInt(lastSwitch);
      // Paso 3: Solicita el estado de los desvíos
      rl.question('⚙️ Estados de los desvíos (ej: 1:8,2:continue,3:10): ', (switchInput) => {
        const switchStates = {};
        switchInput.split(',').forEach((pair) => {
          const [key, val] = pair.split(':');
          // Convierte el valor a número si aplica
          switchStates[key.trim()] = isNaN(val) ? val.trim() : parseInt(val);
        });
        customCase.switchStates = switchStates;
        // Paso 4: Solicita la intensidad de las señales
        rl.question('📶 Intensidades (ej: 8:-80,9:-70): ', (signalInput) => {
          const signalMap = {};
          signalInput.split(',').forEach((pair) => {
            const [key, val] = pair.split(':');
            signalMap[key.trim()] = parseInt(val);
          });
          customCase.signalMap = signalMap;
          // Finalmente envía el mensaje con los datos ingresados
          sendMessage(customCase);
        });
      });
    });
  });
}
// Al conectarse al broker MQTT, se muestra el menú de opciones
client.on('connect', () => {
  rl.question(
    '📋 Elegí el caso:\n1. Tracker en vía 9\n2. Tracker en vía 12\n3. Tracker en vía 14\n4. Ingresar caso custom\n> ',
    (option) => {
      if (option === '4') {
        // Opción para ingresar un caso personalizado
        askCustomCase();
      } else if (cases[option]) {
        // Opción para casos predefinidos
        sendMessage(cases[option]);
      } else {
        // Si la opción es inválida, cierra conexión
        console.log('❌ Opción inválida');
        rl.close();
        client.end();
      }
    }
  );
});
