const connectMQTT = require("./Transbordador-simulation/utils/mqttClient.js");
const Agujas = require("../models/Agujas.js");
const sequelize = require("../config/database.js");

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

  if (via !== confirm) {
    via;
  }

  // Guardar el valor en Baliza
  return via;
}

async function agujas1() {
  const agujas = await findAll();
  console.log(agujas[0].dataValues.id);
  console.log(agujas[1].dataValues.id);
  console.log(agujas[2].dataValues.id);
  console.log(agujas[3].dataValues.id);

  if (agujas[0].dataValues.estado === "A") {
    console.log(agujas[0].dataValues.destinoA);
    return agujas[0].dataValues.destinoA;
  }

  console.log(agujas[0].dataValues.estado);

  if (agujas[1].estado === "A") {
    console.log(agujas[1].dataValues.destinoA);
    return agujas[1].dataValues.destinoA;
  }

  console.log(agujas[1].dataValues.estado);

  if (agujas[2].estado === "A") {
    return agujas[2].dataValues.destinoA;
  }

  console.log(agujas[2].dataValues.estado);

  if (agujas[3].estado === "A") {
    return agujas[3].dataValues.destinoA;
  }
  console.log(agujas[3].dataValues.estado);
  return agujas[3].dataValues.destinoB;
}

async function agujas2() {
  const agujas = await findAll();

  if (agujas[4].dataValues.estado === "A") {
    return agujas[4].dataValues.destinoA;
  } else {
    return agujas[4].dataValues.destinoB;
  }
}

const findAll = async () => {
  try {
    const records = await Agujas.findAll();
    return records;
  } catch (error) {
    throw new Error(`Error fetching records: ${error.message}`);
  }
};
