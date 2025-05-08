const connectMQTT = require("./Transbordador-simulation/utils/mqttClient.js");
const Agujas = require("../models/Agujas.js");
const sequelize = require("../config/database.js");

const client = connectMQTT();

client.on("connect", () => {
  console.log(`Tracker listener connected`);
  client.subscribe("tracker");
});

client.on("message", (topic, message) => {
  // Capture data from topic "tracker"
  console.log(`Tracker listener connected in topic Tracker`);
  const data = JSON.parse(message.toString());
  posxBaliza(data);
});

function posxBaliza(data) {
  // Ordenar las valizas por valores
  const balizas = data;
  balizas.sort((a, b) => a.max - b.max);

  // Tomar nombre de baliza más potente
  let via = balizas[0].name.toString().slice(0, 3);
  if (via === "TRA") {
    via = balizas[0].name.toString().slice(0, 4);
  }

  let confirm = "Desc";
  switch (via) {
    case "C14":
    case "C13":
      // Viene de E2
      confirm = agujas2();
      break;

    case "C12":
    case "C11":
    case "C10":
    case "C09":
    case "C08":
      // Viene de E1
      confirm = agujas1();
      break;

    case "C07":
    case "C06":
    case "C05":
    case "C04":
    case "C03":
    case "C02":
    case "C01":
      // Puede venir TRA1-TRA3
      break;

    case "E1C":
      // Puede venir de E1 E2 o TRA123.
      break;
    case "E1L":
      // Puede venir de GPS o C08-C12.
      break;
    case "E2C":
      // Puede venir de  GPS (E1 E2) o TRA123.
      break;
    case "E2L":
      // Puede venir de GPS o C13-C14.
      break;

    case "CO1":
      // Puede venir de TRA1-TRA3.
      break;
    case "CO2":
      // Puede venir de TRA1-TRA3.
      break;
    case "CO3":
      // Puede venir de TRA1-TRA3.
      break;
    case "CO4":
      // Puede venir de TRA1-TRA3.
      break;

    case "TRA1":
      // Puede venir de CO1-CO4 o E1C o E2C o C01-C07
      break;
    case "TRA2":
      // Puede venir de CO1-CO4 o E1C o E2C o C01-C07
      break;
    case "TRA3":
      // Puede venir de CO1-CO4 o E1C o E2C o C01-C07
      break;

    default:
      console.log("No hay baliza activa en la ruta de las agujas");
  }

  if (via !== confirm) {
    via = confirm;
  }

  // Guardar el valor en Baliza
  return via;
}

async function agujas1() {
  const agujas = (await findAll()).sort(
    (a, b) => a.dataValues.id - b.dataValues.id
  );
  console.log(agujas[0].dataValues.id);
  console.log(agujas[1].dataValues.id);
  console.log(agujas[2].dataValues.id);
  console.log(agujas[3].dataValues.id);

  if (agujas[0].dataValues.estado === "A") {
    return agujas[0].dataValues.destinoA;
  }

  if (agujas[1].estado === "A") {
    return agujas[1].dataValues.destinoA;
  }

  if (agujas[2].estado === "A") {
    return agujas[2].dataValues.destinoA;
  }

  if (agujas[3].estado === "A") {
    return agujas[3].dataValues.destinoA;
  }

  return agujas[3].dataValues.destinoB;
}

async function agujas2() {
  const agujas = (await findAll()).sort((a, b) => a.id - b.id);

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
