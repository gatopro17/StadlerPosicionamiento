const connectMQTT = require('../utils/mqttClient');
const processor = require('../utils/processor')

const client = connectMQTT();

client.on('connect', () => {
  console.log('Tracker listener connected');
  client.subscribe('position/tracker');
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log(`[TRACKER] ID: ${data.trackerID}, Name: ${data.trackerName}, Rail: ${data.rail}, RSSI: ${data.rssi}`);
  processor.processMessage(data, 'tracker');
});
