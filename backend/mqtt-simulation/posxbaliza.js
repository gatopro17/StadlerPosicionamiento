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

  // Tomar via de baliza más potente
  let via = balizas[0].name.toString().slice(0, 3);
  let restoVia = balizas[0].name.toString().slice(3, 11);
  if (via === "TRA") {
    via = balizas[0].name.toString().slice(0, 4);
    restoVia = balizas[0].name.toString().slice(4, 11);
  }

  // Tomar el tracker de la baliza más potente.
  const track = balizas[0].tracker;

  console.log("Track: " + track);
  console.log("Baliza más potente: " + via);

  let confirm = "Desconocida";
  switch (via) {
    case "C14":
    case "C13":
      // Viene de E2
      confirm = await c13c14();
      break;

    case "C12":
    case "C11":
    case "C10":
    case "C09":
    case "C08":
      // Viene de E1
      confirm = await c8c12();
      break;

    case "C07":
    case "C06":
    case "C05":
    case "C04":
    case "C03":
    case "C02":
    case "C01":
      // Viene de TRA1-TRA3
      try {
        confirm = await transbordador(via);
      } catch (error) {
        console.error("Error en la función transbordador:", error.message); // Salir de la función si hay un error
        return;
      }
      break;

    case "E1C":
      // Puede venir de E1L o TRA1-TRA3.
      break;
    case "E1L":
      // Puede venir de GPS o C08-C12.
      confirm = await c08c12();
      const balizasBus = await quitarTracker(confirm, track);
      console.log(balizasBus);
      if (balizasBus === 0) {
        // No viene de C08-C12
        confirm = via;
      } else {
        // Viene de C08-C12
        confirm = via;
      }
      break;
    case "E2C":
      // Puede venir de E2L o TRA1-TRA3.
      break;
    case "E2L":
      // Viene de GPS o C13-C14.
      confirm = await c13c14();
      const balizasBuscar = await quitarTracker(confirm, track);
      console.log(balizasBuscar);
      if (balizasBuscar === 0) {
        // No viene de C13-C14
        confirm = via;
      } else {
        // Viene de C13-C14
        confirm = via;
      }
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
  const viaGuardar = via + restoVia;
  console.log("Guardar en Baliza: " + viaGuardar);

  guardarBaliza(viaGuardar, track);
}

async function transbordador(via) {
  //Leer todos los Transbordadores de la BBDD
  const trans = await Transbordadores.findAll({
    where: {
      id: { [Op.startsWith]: "TRA" },
    },
  });

  // Ordenar los transbordadores por el valor de la via
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

  // Si está en la vía correcta, devolver via.
  if (
    via ===
    (trans[0].dataValues.via ||
      trans[1].dataValues.via ||
      trans[2].dataValues.via)
  ) {
    return via;
  } else {
    // Si no está en la via correcta, comprobar si esta en la anterior o posterior.
    const via1 = [];
    via1[0] = parseInt(trans[0].dataValues.via.slice(1, 3));
    via1[1] = parseInt(trans[1].dataValues.via.slice(1, 3));
    via1[2] = parseInt(trans[2].dataValues.via.slice(1, 3));
    const trans1 = parseInt(via.slice(1, 3)) + 1;
    const trans2 = parseInt(via.slice(1, 3)) - 1;
    for (let i = 0; i <= 2; i++) {
      if (via1[i] == trans1 || via1[i] == trans2) {
        return trans[i].dataValues.via;
      }
    }
    throw new Error("Transbordador demasiado lejos.");
  }
}

async function c8c12() {
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

async function c13c14() {
  try {
    const aguja = await Agujas.findOne({
      where: {
        id: "AG5",
      },
    });
    if (aguja.dataValues.estado === "A") {
      return aguja.dataValues.destinoA;
    } else {
      return aguja.dataValues.destinoB;
    }
  } catch (error) {
    throw new Error(`Error fetching Aguja: ${error.message}`);
  }
}

async function quitarTracker(confirm, track) {
  try {
    actualizado = await Balizas.update(
      { tracker: 0 },
      {
        where: {
          id: { [Op.startsWith]: confirm },
          tracker: track,
        },
      }
    );
    return actualizado;
  } catch (error) {
    console.error("Error al actualizar la baliza:", error);
  }
}

async function guardarBaliza(via, track) {
  const result = await Balizas.update(
    { tracker: track },
    {
      where: {
        id: via,
      },
    }
  )
    .then(() => {
      console.log("Baliza actualizada correctamente.");
    })
    .catch((error) => {
      console.error("Error al actualizar la baliza:", error);
    });
}
