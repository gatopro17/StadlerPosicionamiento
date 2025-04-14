const { spawn } = require('child_process');

// Array con configuraciones para los scripts
const scripts = [
  { name: 'asset', args: ['asset'] },
  { name: 'asset-large', args: ['asset-large'] },
  { name: 'acoplado', args: ['acoplado'] },
  { name: 'transbordador-grande', args: ['transbordador-grande'] },
  { name: 'transbordador-mediano', args: ['transbordador-mediano'] },
  { name: 'assetListener', path: './listener/assetListener.js' },
  { name: 'trackerListener', path: './listener/trackerListener.js' },
  { name: 'logger', path: './listener/logger.js' }
];

scripts.forEach(script => {
  const isPublisher = !script.path; // Si no tiene path, es un publisher simulado
  const path = isPublisher ? './publisher/simulateDevice.js' : script.path;
  const args = isPublisher ? [path, ...script.args] : [path];

  const process = spawn('node', args);

  process.stdout.on('data', (data) => {
    console.log(`[${script.name}] ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`[${script.name} ERROR] ${data}`);
  });

  process.on('close', (code) => {
    console.log(`[${script.name}] process exited with code ${code}`);
  });
});
