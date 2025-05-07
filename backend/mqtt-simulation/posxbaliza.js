
const AgujasService = require ('../services/Agujas.Service');
const connectMQTT = require ("./Transbordador-simulation/utils/mqttClient.js");

const client=connectMQTT()

client.on ('connect',()=> {
    console.log(`Tracker listener connected`);
    client.subscribe('tracker');
    
})

client.on ('message', (topic,message) => {
    console.log(`Tracker listener connected in topic ${topic}`);
    const data = JSON.parse(message.toString());
    console.dir(data);
})

function posxbaliza(data) {
    
}

 function via1 () {
    const agujas=AgujasService.findAll();

    if (agujas[0].estado==='A') {
        return ruta[0].destinoA
    };

    if (aguajas[1].estado==='A') {
        return ruta[1].destinoA
    };

    if (agujas[2].estado === 'A') {
        return ruta[2].destinoA
    };

    if (agujas[3].estado === 'A') {
        return ruta[3].destinoA
    };

}

function via2() {
    if (agujas[4].estado === 'A') {
        return ruta[4].destinoA
    } else   
    { return ruta[3].destinoB}