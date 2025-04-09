const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

function generarBalizasCercanas() {
  const railBase = Math.floor(Math.random() * 11) + 1; // Rail entre 1 y 11
  const balizas = [];

  for (let i = 0; i < 5; i++) {
    const railOffset = Math.floor(Math.random() * 2); // 0 o 1 => rail base o uno siguiente
    const rail = railBase + railOffset;
    const balizaPorRail = Math.floor(Math.random() * 22); // 0 a 21
    const id = (rail - 1) * 22 + balizaPorRail + 1;

    balizas.push({
      id,
      nombre: `Baliza-${id}`, // Nombre de la baliza basado en el ID
      mayor: rail,
      minor: balizaPorRail + 1,
      intensidad: (Math.random() * -70 - 30).toFixed(1), // entre -30 y -100
    });
  }

  return balizas;
}

// Enviar cada 5 minutos
client.on('connect', () => {
  console.log('Conectado al broker MQTT');

  setInterval(() => {
    const trackerId = Math.floor(Math.random() * 5) + 1;
    const balizas = generarBalizasCercanas();

    balizas.forEach((baliza) => {
      const topic = `baliza/gps/${trackerId}`;
      const payload = { ...baliza, trackerId };
      console.log(`Publicando en ${topic}:`, payload);
      client.publish(topic, JSON.stringify(payload));
    });
  }, 1 * 60 * 1000); // Cada 1 minutos
});
