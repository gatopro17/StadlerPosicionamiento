const mqtt = require('mqtt');
// Esta función se encarga de crear un cliente MQTT y conectarse al broker
const connectMQTT = () => {
  return mqtt.connect('mqtt://localhost:1883');
};

module.exports = connectMQTT;
