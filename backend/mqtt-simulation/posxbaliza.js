const AgujasService = require("../services/Agujas.Service");
const connectMQTT = require("./Transbordador-simulation/utils/mqttClient.js");

const client = connectMQTT();

client.on("connect", () => {
  console.log(`Tracker listener connected`);
  client.subscribe("tracker");
});

client.on("message", (topic, message) => {
  console.log(`Tracker listener connected in topic Tracker`);
  const data = JSON.parse(message.toString());
  posxBaliza(data);
});

function posxBaliza(data) {
  const balizas = data;
  balizas.sort((a, b) => a.max - b.max);
  const via = balizas[0].name.toString().slice(0, 3);
  console.log(via);
  let confirm = null;
  if (via >= "C13") {
    confirm = agujas2();
  } else if (via >= "C08") {
    confirm = agujas1();
  } else {
    //llamar a transbordador
    console.log("No hay baliza activa en la ruta de las agujas");
  }

  console.log(via, confirm);
}

async function agujas1() {
  const agujas = await AgujasService.findAll();

  if (agujas[0].estado === "A") {
    return ruta[0].destinoA;
  }

  if (agujas[1].estado === "A") {
    return ruta[1].destinoA;
  }

  if (agujas[2].estado === "A") {
    return ruta[2].destinoA;
  }

  if (agujas[3].estado === "A") {
    return ruta[3].destinoA;
  }
}

async function agujas2() {
  const agujas = await AgujasService.findAll();
  console.log(agujas);

  if (agujas[4].estado === "A") {
    return ruta[4].destinoA;
  } else {
    return ruta[4].destinoB;
  }
}
