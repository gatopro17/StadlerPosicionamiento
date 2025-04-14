const connectMQTT = require('../utils/mqttClient');
const processor = require('../utils/processor');
const client = connectMQTT();

client.on('connect', () => {
  console.log('Logger connected');
  client.subscribe('position/#');
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  console.log(`[LOG] Topic: ${topic}, Payload:`, data);
 
  if (topic.includes('tracker')) {
    processor.processMessage(data, 'tracker');
  } else if (topic.includes('asset')) {
    processor.processMessage(data, 'asset');
  }

});
