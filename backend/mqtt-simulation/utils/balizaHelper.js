const generateCabeceraBeacon = (railNumber) => ({
    id: `cabecera-${railNumber}`,
    mayor: railNumber,
    minor: 1, // cabecera position is always minor = 1
  });
  
  const generateTransbordadorBeacon = (id) => ({
    id: `transbordador-${id}`,
    mayor: 100 + id,
    minor: 1,
  });
  
  module.exports = {
    generateCabeceraBeacon,
    generateTransbordadorBeacon,
  };
  