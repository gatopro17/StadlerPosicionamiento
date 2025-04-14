const connectMQTT = require('../utils/mqttClient');
const processor = require('../utils/processor');
const client = connectMQTT();

client.on('connect', () => {
  console.log('Asset listener connected');
  client.subscribe('position/asset');
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log(`[ASSET] ID: ${data.trackerID}, From: ${data.beaconId || `Rail ${data.rail}`}, RSSI: ${data.rssi}`);
  processor.processMessage(data, 'asset');
});
