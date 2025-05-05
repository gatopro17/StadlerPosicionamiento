/**
 * Genera un conjunto de balizas cercanas simuladas para un tracker.
 * Las balizas se distribuyen aleatoriamente en los rieles y asignan valores aleatorios a su intensidad.
 * 
 * @param {number} cantidad - El número de balizas a generar.
 * @returns {Array} Un arreglo de objetos que representan las balizas generadas.
 */

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

function generarBalizasCercanas(cantidad) {
  const railsBase = Math.floor(Math.random() * 11) + 1; // Rails entre 1 y 11
  const balizas = [];

  for (let i = 0; i < cantidad; i++) {
    const railsOffset = Math.floor(Math.random() * 2); // 0 o 1 => rails base o uno siguiente
    const rails = railsBase + railsOffset;
    const balizaPorRails = Math.floor(Math.random() * 22); // 0 a 21
    const id = (rails - 1) * 22 + balizaPorRails + 1;

    balizas.push({
      id,
      nombre: `Baliza-${id}`, // Nombre de la baliza basado en el ID
      mayor: rails,
      minor: balizaPorRails + 1,
      intensidad: (Math.random() * -70 - 30).toFixed(1), // entre -30 y -100
    });
  }

  return balizas;
}


/**
 * Conexión al broker MQTT y configuración para la publicación periódica de balizas.
 * Cada x tiempo se simula el envío de balizas cercanas para un tracker aleatorio.
 */
client.on('connect', () => {
  console.log('Conectado al broker MQTT');

  setInterval(() => {
   const trackerId = Math.floor(Math.random() * 5) + 1; // Simulando 5 trackers
      //const trackerId = 1; // Simulando un tracker específico
    const cantidadBalizas = Math.floor(Math.random() * 5) + 1; // Entre 1 y 5 balizas
    const balizas = generarBalizasCercanas(cantidadBalizas);
 // Publicar cada baliza para el tracker correspondiente
    balizas.forEach((baliza) => {
       // El topic en el que se publica es específico para cada tracker
      const topic = `baliza/gps/${trackerId}`;
        // Se prepara el payload con la baliza y el trackerId
      const payload = { ...baliza, trackerId };
        // Publicar el mensaje en el broker MQTT
      console.log(`📡 Publicando en ${topic}:`, payload);
      client.publish(topic, JSON.stringify(payload));
    });

    console.log(`🔁 Enviadas ${cantidadBalizas} balizas para tracker ${trackerId}`);
  }, 60 * 1000); // Cada x segundos
});
