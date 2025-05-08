const connectMQTT = require("./Transbordador-simulation/utils/mqttClient.js");
const Transbordadores = require("../models/Transbordadores.js");
const Agujas = require("../models/Agujas.js");
const Balizas = require("../models/Balizas.js");
const sequelize = require("../config/database.js");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");

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

async function posxBaliza(data) {
  // Ordenar las valizas por valores
  const balizas = data;
  balizas.sort((a, b) => a.max - b.max);

  // Tomar nombre de baliza más potente
  let via = balizas[0].name.toString().slice(0, 3);
  let restoVia = balizas[0].name.toString().slice(3, 11);
  if (via === "TRA") {
    via = balizas[0].name.toString().slice(0, 4);
    restoVia = balizas[0].name.toString().slice(4, 11);
  }

  const track = balizas[0].tracker;

  console.log("Track: " + track);
  console.log("Baliza más potente: " + via);
  let confirm = "Desc";
  switch (via) {
    case "C14":
    case "C13":
      // Viene de E2
      confirm = await agujas2();
      break;

    case "C12":
    case "C11":
    case "C10":
    case "C09":
    case "C08":
      // Viene de E1
      confirm = await agujas1();
      break;

    case "C07":
    case "C06":
    case "C05":
    case "C04":
    case "C03":
    case "C02":
    case "C01":
      // Viene de TRA1-TRA3
      confirm = await transbordador(via);
      break;

    case "E1C":
      // Puede venir de E1 E2 o TRA1-TRA3.
      break;
    case "E1L":
      // Puede venir de GPS o C08-C12.
      break;
    case "E2C":
      // Puede venir de  GPS (E1 E2) o TRA1-TRA3.
      break;
    case "E2L":
      // Puede venir de GPS o C13-C14.
      break;

    case "CO1":
    case "CO2":
    case "CO3":
    case "CO4":
      // Puede venir de TRA1-TRA3.
      break;

    case "TRA1":
    case "TRA2":
    case "TRA3":
      // Puede venir de CO1-CO4 o E1C o E2C o C01-C07
      break;

    default:
      console.log("No hay baliza activa en la ruta.");
  }

  if (via !== confirm) {
    via = confirm;
  }

  // Guardar el valor en Baliza
  console.log(via);
  const viaGuardar = via + restoVia;
  console.log(viaGuardar);
  Balizas.update(
    { tracker: track },
    {
      where: {
        id: viaGuardar,
      },
    }
  )
    .then(() => {
      console.log("Baliza actualizada correctamente.");
    })
    .catch((error) => {
      console.error("Error al actualizar la baliza:", error);
    });

  return via;
}

async function transbordador(via) {
  const trans = await Transbordadores.findAll({
    where: {
      id: { [Op.startsWith]: "TRA" },
    },
  });
  trans.sort((a, b) => {
    if (a.dataValues.via > b.dataValues.via) {
      return 1;
    }
    if (a.dataValues.via < b.dataValues.via) {
      return -1;
    }
    return 0;
  });

  console.log(trans[0].dataValues.id, trans[0].dataValues.via);
  console.log(trans[1].dataValues.id, trans[1].dataValues.via);
  console.log(trans[2].dataValues.id, trans[2].dataValues.via);

  if (
    via ===
    (trans[0].dataValues.via ||
      trans[1].dataValues.via ||
      trans[2].dataValues.via)
  ) {
    return via;
  } else {
    const via1 = [];
    via1[0] = parseInt(trans[0].dataValues.via.slice(1, 3));
    via1[1] = parseInt(trans[1].dataValues.via.slice(1, 3));
    via1[2] = parseInt(trans[2].dataValues.via.slice(1, 3));
    const trans1 = parseInt(via.slice(1, 3)) + 1;
    const trans2 = parseInt(via.slice(1, 3)) - 1;
    console.log(trans1);
    console.log(trans2);
    for (let i = 0; i <= 2; i++) {
      if (via1[i] == trans1 || via1[i] == trans2) {
        return trans[i].dataValues.via;
      }
    }
    // Error Transbordador demasiado lejos
  }
}

async function agujas1() {
  const agujas = (await Agujas.findAll()).sort(
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
  const agujas = (await Agujas.findAll()).sort((a, b) => a.id - b.id);

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
