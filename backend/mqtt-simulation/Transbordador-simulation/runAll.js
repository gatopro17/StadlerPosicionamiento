// Importa la función 'spawn' desde el módulo 'child_process' para ejecutar procesos secundarios
const { spawn } = require('child_process');

// Arreglo de configuraciones para cada script a ejecutar.
// Algunos son scripts de publicación (publisher) y otros son listeners.
const scripts = [
  { name: 'asset', args: ['asset'] },                             // Simulador de activo pequeño
  { name: 'asset-large', args: ['asset-large'] },                 // Simulador de activo grande
  { name: 'acoplado', args: ['acoplado'] },                       // Simulador de acoplamiento
  { name: 'transbordador-grande', args: ['transbordador-grande'] }, // Simulador de transbordador grande
  { name: 'transbordador-mediano', args: ['transbordador-mediano'] }, // Simulador de transbordador mediano
  { name: 'assetListener', path: './listener/assetListener.js' }, // Script que escucha mensajes de activos
  { name: 'trackerListener', path: './listener/trackerListener.js' }, // Script que escucha mensajes de trackers
  { name: 'logger', path: './listener/logger.js' },               // Script que registra los datos recibidos
  { name: 'transbordadorListener', path: './listener/transbordadorListener.js' }
];

// Recorre cada configuración del array para iniciar los procesos correspondientes
scripts.forEach(script => {
  // Determina si el script es un publisher (si no tiene una propiedad 'path', se asume que es publisher)
  const isPublisher = !script.path;

  // Define la ruta del script a ejecutar
  const path = isPublisher ? './publisher/simulateDevice.js' : script.path;

  // Define los argumentos que se le pasarán al script
  // Para los publishers se pasa la ruta y sus argumentos definidos en el array (por ejemplo, 'asset')
  // Para los listeners solo se pasa la ruta del script
  const args = isPublisher ? [path, ...script.args] : [path];

  // Inicia el proceso usando 'spawn', ejecutando 'node' con los argumentos definidos
  const process = spawn('node', args);

  // Captura la salida estándar del proceso (por ejemplo, console.log dentro del script)
  process.stdout.on('data', (data) => {
    console.log(`[${script.name}] ${data}`);
  });

  // Captura la salida de errores del proceso (por ejemplo, console.error dentro del script)
  process.stderr.on('data', (data) => {
    console.error(`[${script.name} ERROR] ${data}`);
  });

  // Captura el evento cuando el proceso se cierra e imprime el código de salida
  process.on('close', (code) => {
    console.log(`[${script.name}] process exited with code ${code}`);
  });
});
