const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");
const getRandomIntensity = require("../utils/randomIntensity");
const getRandomBalizaTransbordador = require("../utils/randomBalizaTransbordador");
const getRandomBalizaVia1_14 = require("../utils/randomBalizaVia1_14");
const getRandomBalizaCabecera = require("../utils/randomBalizaCabecera");
const getRandomBalizaViaE = require("../utils/randomBalizaViaE");
const getRandomBalizaViaCO = require("../utils/randomBalizaViaCO");

let activoRandom = Math.floor(Math.random() * 3) + 1;
const TrackerActivoTra = {
  id: `TA${activoRandom}`,
  balizasRecibidas: [
    (balizaTra1 = {
      id: getRandomBalizaTransbordador(),
      intensidad: getRandomIntensity(),
    }),
    (balizaTra2 = {
      id: getRandomBalizaTransbordador(),
      intensidad: getRandomIntensity(),
    }),
    (balizaTra3 = {
      id: getRandomBalizaTransbordador(),
      intensidad: getRandomIntensity(),
    }),
    (balizaTra4 = {
      id: getRandomBalizaTransbordador(),
      intensidad: getRandomIntensity(),
    }),
    (cabecera1 = {
      id: getRandomBalizaCabecera(),
      intensidad: getRandomIntensity(),
    }),
  ],
};

const TrackerActivoVia = {
  id: `TA${activoRandom}`,
  balizasRecibidas: [
    (balizaVia1 = {
      id: getRandomBalizaVia1_14(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia2 = {
      id: getRandomBalizaVia1_14(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia3 = {
      id: getRandomBalizaVia1_14(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia4 = {
      id: getRandomBalizaVia1_14(),
      intensidad: getRandomIntensity(),
    }),
    (cabecera1 = {
      id: getRandomBalizaCabecera(),
      intensidad: getRandomIntensity(),
    }),
  ],
};

const TrackerActivoViaE = {
  id: `TA${activoRandom}`,
  balizasRecibidas: [
    (balizaVia1 = {
      id: getRandomBalizaViaE(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia2 = {
      id: getRandomBalizaViaE(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia3 = {
      id: getRandomBalizaViaE(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia4 = {
      id: getRandomBalizaViaE(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia5 = {
      id: getRandomBalizaViaCO(),
      intensidad: getRandomIntensity(),
    }),
  ],
};

const TrackerActivoViaCO = {
  id: `TA${activoRandom}`,
  balizasRecibidas: [
    (balizaVia1 = {
      id: getRandomBalizaViaE(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia2 = {
      id: getRandomBalizaViaCO(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia3 = {
      id: getRandomBalizaViaCO(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia4 = {
      id: getRandomBalizaViaCO(),
      intensidad: getRandomIntensity(),
    }),
    (balizaVia5 = {
      id: getRandomBalizaViaCO(),
      intensidad: getRandomIntensity(),
    }),
  ],
};

client.on("connect", () => {
  console.log("📤 Publisher connected");
  client.publish(
    "simulation/activoTransbordador",
    JSON.stringify(TrackerActivoTra),
    {},
    () => {
      console.log(
        "✅ Mensaje enviado en el publisher simulation/activoTransbordador : ",
        TrackerActivoTra
      );
      client.end();
    }
  );
  client.publish(
    "simulation/activoVia",
    JSON.stringify(TrackerActivoVia),
    {},
    () => {
      console.log(
        "✅ Mensaje enviado en el publisher simulation/activoVia ",
        TrackerActivoVia
      );
      client.end();
    }
  );
  client.publish(
    "simulation/activoViaE",
    JSON.stringify(TrackerActivoViaE),
    {},
    () => {
      console.log(
        "✅ Mensaje enviado en el publisher simulation/activoViaE",
        TrackerActivoViaE
      );
      client.end();
    }
  );
  client.publish(
    "simulation/activoViaCO",
    JSON.stringify(TrackerActivoViaCO),
    {},
    () => {
      console.log(
        "✅ Mensaje enviado en el publisher simulation/activoViaCO ",
        TrackerActivoViaCO
      );
      client.end();
    }
  );
});
