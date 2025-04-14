const generateCabeceraBeacon = (railNumber) => ({
    id: `cabecera-${railNumber}`,
    mayor: railNumber,
    minor: 1, // cabecera position is always minor = 1
  });
  
  const generateTransbordadorBeacon = (id) => {
    const prefix = `T-${id}`;
    let beacons = [];
  
    if (id === 1) { // Grande
      beacons = Array.from({ length: 6 }, (_, i) => ({
        id: `G${i + 1}`,
        nombre: `Baliza G${i + 1}`,
        trackerID: prefix,
        mayor: 100 + id,
        minor: i + 1
      }));
    } else if (id === 2) { // Mediano
      beacons = Array.from({ length: 4 }, (_, i) => ({
        id: `M${i + 1}`,
        nombre: `Baliza M${i + 1}`,
        trackerID: prefix,
        mayor: 100 + id,
        minor: i + 1
      }));
    } else if (id === 3) { // Pequeño
      beacons = [{
        id: 'P1',
        nombre: 'Baliza P1',
        trackerID: prefix,
        mayor: 100 + id,
        minor: 1
      }];
    }
  
    return beacons;
  };
  
  module.exports = {
    generateCabeceraBeacon,
    generateTransbordadorBeacon,
  };
  