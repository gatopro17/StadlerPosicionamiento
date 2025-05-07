require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

//importar los servicios
const BalizasService = require('../../../services/Balizas.Service');

// Importa la función que gestiona la conexión MQTT desde un archivo utilitario
const connectMQTT = require('../utils/mqttClient');
// Importa el módulo `processor` que procesará los mensajes recibidos
const processor = require('../utils/processor');
// Establece la conexión con el servidor MQTT utilizando la función `connectMQTT`
const client = connectMQTT();
// Evento que se ejecuta cuando la conexión con el broker MQTT es exitosa
client.on('connect', () => {
   // Muestra un mensaje indicando que el listener para los activos está conectado
  console.log('Transbordador listener connected');
   // Se suscribe al tema `position/asset` para recibir los mensajes relacionados con la posición de los activos
  client.subscribe('position/transbordador');
});
// Evento que se ejecuta cuando se recibe un mensaje en el tema suscrito
client.on('message', async (topic, message) => {
    // Convierte el mensaje recibido (buffer) en un objeto JSON
    const data = JSON.parse(message.toString());
    console.log('DATA TRANSBORDADORES:\n', JSON.stringify(data, null, 2));
  // para manejar los transbordadores y su posicion.
    if (data?.coupled) {
       console.log('🧲 Transbordador Acoplado. Señal del tracker:', data.coupled.id);
    }
    //sacar las dos mayores intensidades de las que sean cabecera
    if (Array.isArray(data)) {
        // Espera a que todas las búsquedas de tipo se resuelvan
        const enrichedData = await Promise.all(
          data.map(async baliza => {
            const dbBaliza = await BalizasService.findById(baliza.id);
            return {
              ...baliza,
              tipo: dbBaliza?.tipo || 'desconocido',
              via: dbBaliza?.via || 'desconocida'
            };
          })
        );
   
        // Ahora `enrichedData` contiene todas las balizas con el campo `tipo`
        console.log('DATA COMPLETAAAAA', JSON.stringify(enrichedData, null, 2));
    
        // filtrar cabeceras y sacar las dos con mayor intensidad
        const cabeceras = enrichedData.filter(b => b.tipo === 'cabecera');
        const topCabeceras = cabeceras
          .sort((a, b) => b.intensidad - a.intensidad)
          .slice(0, 2);
        //si las dos cabeceras tienen la misma via, se muestra la via por consola, si no, se muestra la que mayor intensidad tiene
        if (topCabeceras[0].via === topCabeceras[1].via) {
          console.log('🚂 Transbordador en la vía:', topCabeceras[0].via);
        } else {
            console.log('🚂 Transbordador en la vía:', topCabeceras[0].via);
            }
    

   
  processor.processMessage(data);
  }
});