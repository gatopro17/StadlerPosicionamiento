const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost'); // Conectar al broker MQTT

// Función para generar datos aleatorios de baliza
function generarDatosBaliza() {
  const baliza = {
    id: Math.floor(Math.random() * 100),
    mayor: Math.floor(Math.random() * 7) + 1,  // Rail entre 1 y 7
    minor: Math.floor(Math.random() * 20) + 1,  // Posición entre 1 y 20
    // Simular una intensidad entre -100 y -30 dBm
    intensidad: (Math.random() * -70 - 30).toFixed(1)  // entre -30 y -100

  };
  return baliza;
}

// Conexión y publicación
client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  setInterval(() => {
    const datosBaliza = generarDatosBaliza();
    const topic = `baliza/gps/${datosBaliza.id}`;  // Tópico dinámico con ID de baliza
    console.log(`Publicando datos en ${topic}: ${JSON.stringify(datosBaliza)}`);
    client.publish(topic, JSON.stringify(datosBaliza));  // Publica los datos
  }, 5000); // Publicar cada 5 segundos
});
