// Importa el módulo `fork` para ejecutar scripts en procesos hijos

const { fork } = require('child_process');
// Importa el módulo `path` para gestionar las rutas de los archivos
const path = require('path');

// Define las rutas absolutas a los scripts de publisher y listener
// Esto asegura que los scripts se ejecuten correctamente desde cualquier ubicación
const publisherPath = path.join(__dirname, '/publisher/simulateActiveTracker.js');
const listenerPath = path.join(__dirname, '/listener/activeTrackerListener.js');

// Inicia el proceso hijo para el listener
// El listener es el que recibirá los mensajes de MQTT
const listener = fork(listenerPath);
// Cuando el proceso hijo del listener termine, muestra un mensaje con el código de salida
listener.on('exit', (code) => {
  console.log(`🔇 Listener finalizado con código ${code}`);
});

// Inicia el proceso hijo para el publisher
// El publisher es el que enviará los mensajes de MQTT
const publisher = fork(publisherPath);
// Cuando el proceso hijo del publisher termine, muestra un mensaje con el código de salida
publisher.on('exit', (code) => {
  console.log(`📤 Publisher finalizado con código ${code}`);
});
// Muestra un mensaje en consola para indicar que la simulación ha comenzado
console.log('🚀 Iniciando simulación de agujas...');