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

  // Pasar balizas a vias
  let vias = balizaVia(balizas);

  // Tomar el tracker de la baliza.
  const track = balizas[0].tracker;

  console.log("Track: " + track);
  console.log("Baliza más potente: " + vias[0]);

  let testVia = "";
  switch (vias[0]) {
    case "C14":
    case "C13":
      // Viene de E2
      misma = mismavia(vias, track);
      testVia = await c13c14();
      await quitarTracker(track);
      break;

    case "C12":
    case "C11":
    case "C10":
    case "C09":
    case "C08":
      // Viene de E1L
      await quitarTracker(track);
      testVia = await c8c12();
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
        await quitarTracker(track);
        testVia = await transbordador(vias);
      } catch (error) {
        console.error("Error en la función transbordador:", error.message); // Salir de la función si hay un error
        return;
      }
      break;

    case "E1C":
      // Puede venir de E1L o TRA1-TRA3.
      await quitarTracker(track);
      testVia = await transbordador(vias);
      break;
    case "E1L":
      // Puede venir de GPS o C08-C12.
      await quitarTracker(track);
      testVia = await c08c12();
      break;
    case "E2C":
      // Puede venir de E2L o TRA1-TRA3.
      break;
    case "E2L":
      // Viene de GPS o C13-C14.
      quitarTracker(track);
      testVia = await c13c14();
      const balizasBuscar = await quitarTracker(track);
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
      console.log("No se ha detectado baliza valida.");
  }
  console.log(await buscarTracker(track));

  // Guardar el valor en Baliza
  const viaGuardar = restoBaliza(vias, balizas, testVia);
  guardarBaliza(viaGuardar, track);
}

async function transbordador(vias) {
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
    vias[0] ===
    (trans[0].dataValues.via ||
      trans[1].dataValues.via ||
      trans[2].dataValues.via)
  ) {
    return vias[0];
  }

  // Si no está en la via correcta, comprobar si esta en alguna baliza.
  if (vias.has(trans[0].dataValues.via)) {
    return trans[0].dataValues.via;
  }
  if (vias.has(trans[1].dataValues.via)) {
    return trans[1].dataValues.via;
  }
  if (vias.has(trans[2].dataValues.via)) {
    trans[2].dataValues.via;
  }

  throw new Error("No se ha enconstrado via correcta");
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

async function quitarTracker(track) {
  try {
    const actualizado = await Balizas.update(
      { tracker: 0 },
      {
        where: {
          //id: { [Op.startsWith]: confirm },
          tracker: track,
        },
      }
    );
    return actualizado;
  } catch (error) {
    console.error("Error al actualizar la baliza:", error);
  }
}

async function buscarTracker(track) {
  try {
    const actualizado = await Balizas.findOne({
      where: {
        tracker: track,
      },
    });
    console.log("Baliza encontrada: " + actualizado);
    return actualizado.dataValues;
  } catch (error) {
    console.error("Error al actualizar la baliza:", error);
  }
}

function balizaVia(balizas) {
  let caracteres = 3;
  // Tomar via de baliza más potente
  const viaMuestra = balizas[0].name.toString().slice(0, caracteres);

  if (viaMuestra === "TRA") {
    caracteres = 4;
  }

  let vias = new Set();
  for (let i = 0; i < balizas.length; i++) {
    vias.add(balizas[i].name.toString().slice(0, caracteres));
  }

  return vias;
}

function restoBaliza(vias, balizas, testVia) {
  let viaGuardar = "";
  if (testVia !== vias[0]) {
    if (vias.has(testVia)) {
      viaGuardar = balizas.find((element) => element.name.startsWith(testVia));
    } else {
      const lon = viaGuardar.length;
      viaGuardar = testVia + balizas[0].name.slice(lon, 11);
    }
  } else {
    viaGuardar = balizas[0].name;
  }

  console.log("Guardar en Baliza: " + viaGuardar);
  return viaGuardar;
}

async function mismavia(via, track) {
  try {
    const viaActual = await Balizas.findOne({
      where: {
        via_actual: { [Op.startsWith]: via[0] },
        tracker: track,
      },
    });
    return viaActual.dataValues;
  } catch (error) {
    console.error("Error al actualizar el activo:", error);
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
