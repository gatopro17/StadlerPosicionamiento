const connectMQTT = require("./Transbordador-simulation/utils/mqttClient.js");
const Transbordadores = require("../models/Transbordadores.js");
const Agujas = require("../models/Agujas.js");
const Balizas = require("../models/Balizas.js");
const Activos = require("../models/Activos.js");
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
  // Ordenar las Balizas por valores
  const balizas = data;
  balizas.sort((a, b) => a.max - b.max);

  // Pasar balizas a vias eliminando duplicados
  let vias = await balizaVia(balizas);

  // Tomar el tracker de la baliza.
  const track = balizas[0].tracker;

  console.log("Track: " + track, "Baliza: " + vias[0]);

  // logica
  // Misma via
  let misma = "";
  let testVia = "";
  let posibleVia1 = "";
  let posibleVia2 = "";

  //  Comprobar si está en la misma via
  misma = await mismaVia(vias, track);

  if (misma !== null) {
    testVia = misma;
  } else {
    // Si no está en la misma via, comprobar si hay una posible via
    switch (vias[0]) {
      case "C14":
      case "C13":
        // Viene de E2
        testVia = await c13c14();
        break;

      case "C12":
      case "C11":
      case "C10":
      case "C09":
      case "C08":
        // Viene de E1
        testVia = await c8c12();
        break;

      case "C03":
      case "C02":
      case "C01":
      case "CO1":
      case "CO4":
        // Viene de TRA1-TRA3.
        testVia = await transbordador(vias);
        break;

      case "C07":
      case "C06":
      case "C05":
      case "C04":
      case "CO3":
      case "CO2":
        // Viene de TRA1-TRA3 CO2-CO3 E1C-E2C
        console.log("Ruta 06");

        testVia = await transbordador(vias);

        break;

      case "E1C":
        // Puede venir de E1L o TRA1-TRA3 o C06
        break;
      case "E1L":
        // Puede venir de GPS o C08-C12.
        testVia = await c8c12();
        break;
      case "E2C":
        // Puede venir de E2L o TRA1-TRA3 o C07
        break;
      case "E2L":
        // Viene de GPS o C13-C14.
        testVia = await c13c14();
        break;

      case "TRA1":
      case "TRA2":
      case "TRA3":
        // Puede venir de CO1-CO4 o E1C o E2C o C01-C07
        break;

      default:
        console.log("No se ha detectado baliza valida.");
    }
  }
  // Guardar el valor en activo
  const balizaActual = restoBaliza(vias, balizas, testVia);
  const viaGuardar = await buscarViaenBaliza(balizaActual);
  await actualizaActivo(
    viaGuardar,
    balizaActual,
    posibleVia1,
    posibleVia2,
    track
  );
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

  // Si está en la vía correcta, devolver via.
  if (
    vias[0] ===
    (trans[0].dataValues.via ||
      trans[1].dataValues.via ||
      trans[2].dataValues.via)
  ) {
    return vias[0];
  }
  // Si no está en la via correcta.
  return vias[1];
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

async function balizaVia(balizas) {
  let vias = new Set();
  for (let i = 0; i < balizas.length; i++) {
    const viaBaliza = await Balizas.findOne({
      where: {
        id: balizas[i].name,
      },
    });
    vias.add(viaBaliza.dataValues.via1);
  }

  return Array.from(vias);
}

async function mismaVia(vias, track) {
  try {
    const viaActual = await Activos.findOne({
      where: {
        via_actual: { [Op.startsWith]: vias[0] },
        tracker: track,
      },
    });

    if (viaActual === null) {
      return null;
    }
    return viaActual.dataValues.via_actual;
  } catch (error) {
    console.error("Error al buscar el activo:", error.message);
  }
}

async function actualizaActivo(via, baliza, posibleVia1, posibleVia2, track) {
  const result = await Activos.update(
    {
      via_actual: via,
      baliza_actual: baliza,
      posible_via: posibleVia1,
      posible_via2: posibleVia2,
    },
    {
      where: {
        tracker: track,
      },
    }
  )
    .then(() => {
      console.log("Activo actualizado correctamente.");
    })
    .catch((error) => {
      console.error("Error al actualizar Activo:", error);
    });
}

async function buscarViaenBaliza(baliza) {
  try {
    const via = await Balizas.findOne({
      where: {
        id: baliza,
      },
    });
    console.log("Via encontrada: " + via.dataValues.via1);
    return via.dataValues.via1;
  } catch (error) {
    console.error("Error en busqueda via:", error);
  }
}

function restoBaliza(vias, balizas, testVia) {
  let viaGuardar = "";
  if (testVia !== vias[0]) {
    const find = balizas.find((element) => element.name.startsWith(testVia));
    viaGuardar = find.name;
  } else {
    viaGuardar = balizas[0].name;
  }
  console.log(viaGuardar);
  return viaGuardar;
}
