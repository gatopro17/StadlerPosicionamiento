const connectMQTT = require('../utils/mqttClient');
const processor = require('../utils/processor');
const client = connectMQTT();

client.on('connect', () => {
  console.log('Asset listener connected');
  client.subscribe('position/asset');
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());

  const source = data.beaconId
    ? `From Beacon ${data.beaconId}`
    : data.rail !== undefined
      ? `From Rail ${data.rail}`
      : 'Unknown source';

  console.log(`[ASSET] ID: ${data.trackerID}, ${source}, RSSI: ${data.rssi}`);

  processor.processMessage(data, 'asset');
});