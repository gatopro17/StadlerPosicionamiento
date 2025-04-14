const mqtt = require('mqtt');

const connectMQTT = () => {
  return mqtt.connect('mqtt://localhost:1883');
};

module.exports = connectMQTT;
