const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');

function generarBalizasCercanas(cantidad) {
  const railBase = Math.floor(Math.random() * 11) + 1; // Rail entre 1 y 11
  const balizas = [];

  for (let i = 0; i < cantidad; i++) {
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

client.on('connect', () => {
  console.log('Conectado al broker MQTT');

  setInterval(() => {
    const trackerId = Math.floor(Math.random() * 5) + 1; // Simulando 5 trackers

    const cantidadBalizas = Math.floor(Math.random() * 5) + 1; // Entre 1 y 5 balizas
    const balizas = generarBalizasCercanas(cantidadBalizas);

    balizas.forEach((baliza) => {
      const topic = `baliza/gps/${trackerId}`;
      const payload = { ...baliza, trackerId };
      console.log(`📡 Publicando en ${topic}:`, payload);
      client.publish(topic, JSON.stringify(payload));
    });

    console.log(`🔁 Enviadas ${cantidadBalizas} balizas para tracker ${trackerId}`);
  }, 60 * 1000); // Cada 1 minuto
});
