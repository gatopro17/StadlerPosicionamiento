const TrackerPositionLogsService = require('../../../services/TrackerPositionLogs.Service');
const CouplingLogsService = require('../../../services/CouplingLogs.Service');
const AssetMountLogsService = require('../../../services/AssetMountLogs.Service');

/**
 * Guarda un log de posición de tracker.
 * @param {Object} data - Datos del mensaje MQTT.
 */
async function handleTrackerPositionLog(data) {
    const trackerId = data.trackerId || data.trackerID;
    const {
      trackerName,
      rail,
      position,
      beaconId,
      rssi
    } = data;
  
    if (!trackerId || rail === undefined || position === undefined) {
      console.warn('Datos incompletos para log de posición de tracker:', data);
      return;
    }
  
    await TrackerPositionLogsService.create({
      trackerId,
      trackerName: trackerName || null,
      rail,
      position,
      beaconId: beaconId || null,
      rssi: rssi || null
    });
  }
  

/**
 * Guarda un log de acoplamiento (coupling).
 * @param {Object} data - Datos del mensaje MQTT.
 */
async function handleCouplingLog(data) {
  const { tracker1Id, tracker2Id, rail, rssiDifference, timestampDiffMs } = data;

  if (!tracker1Id || !tracker2Id || rail === undefined) {
    console.warn('Datos incompletos para log de acoplamiento:', data);
    return;
  }
  try {
  await CouplingLogsService.create({
    tracker1Id,
    tracker2Id,
    rail,
    rssiDifference: rssiDifference || null,
    timestampDiffMs: timestampDiffMs || null
  });
  console.log("📝 Log de acoplamiento creado exitosamente");
} catch (err) {
  console.error("❌ Error al crear log de acoplamiento:", err);
}
}

/**
 * Guarda un log de montaje de activo sobre tracker.
 * @param {Object} data - Datos del mensaje MQTT.
 */
async function handleAssetMountLog(data) {
  const { assetId, mountedOnId, rssi } = data;

  if (!assetId || !mountedOnId) {
    console.warn('Datos incompletos para log de montaje de activo:', data);
    return;
  }

  await AssetMountLogsService.create({
    assetId,
    mountedOnId,
    rssi: rssi || null
  });
}

module.exports = {
  handleTrackerPositionLog,
  handleCouplingLog,
  handleAssetMountLog
};
