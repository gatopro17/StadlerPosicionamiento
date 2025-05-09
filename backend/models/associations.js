/**
 * Este archivo se encarga de definir las asociaciones entre los modelos de Sequelize.
 * Las asociaciones permiten a Sequelize gestionar las relaciones entre las tablas
 * de manera sencilla y optimizada.
 *
 * @module Associations
 */

const Rails = require("./Rails");
const Balizas = require("./Balizas");
const TrackerLogs = require("./Transbordadores");
const TrackerActivos = require("./Activos");
const Agujas = require("./Agujas");
const TrackerPositionLogs = require("./TrackerPositionLogs");
const CouplingLogs = require("./CouplingLogs");
const Transbordadores = require("./Transbordadores");
const Trackers = require("./Trackers");
const Vias = require("./Vias");

// --- Asociación: transbordadores.acoplado -> transbordadores.id (self-association)
Transbordadores.belongsTo(Transbordadores, {
  foreignKey: "acoplado",
  as: "Acoplado",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// --- Asociación: transbordadores.tracker -> trackers.id
Transbordadores.belongsTo(Trackers, {
  foreignKey: "tracker",
  as: "Tracker",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// --- Asociación: transbordadores.via -> vias.id
Transbordadores.belongsTo(Vias, {
  foreignKey: "via",
  as: "Via",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// --- Asociación: balizas.via -> vias.id
Balizas.belongsTo(Vias, {
  foreignKey: "via",
  as: "Via",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// Asociaciones entre Rails y Balizas
Vias.hasMany(Balizas, {
  foreignKey: "via", // campo en Balizas que apunta a Vias.id
  sourceKey: "id",
  as: "balizas",
});

module.exports = {
  Rails,
  Balizas,
  TrackerLogs,
  TrackerActivos,
  Agujas,
  TrackerPositionLogs,
  CouplingLogs,
  Transbordadores,
  Trackers,
  Vias,
};
