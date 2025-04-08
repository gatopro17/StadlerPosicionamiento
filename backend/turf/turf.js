const turf = require("@turf/turf");
// Polígono exterior (azul)
const exteriorPolygon = turf.polygon([
    [
      // Esquina superior izquierda
      [-0.3049983931707514, 39.546799447881384],
      // Esquina inferior izquierda
      [-0.3083660890047324, 39.54253951610102],
      // Esquina inferior derecha
      [-0.3045894821889889, 39.541319471601945],
      // Esquina superior derecha
      [-0.3011446040899322, 39.545255021914755],
      // Cierre de área/polígono
      [-0.3049983931707514, 39.546799447881384],
    ],
  ]);
  
  // Polígono interior (rojo)
  const interiorPolygon = turf.polygon([
    [
      // Esquina superior izquierda
      [-0.30403314814649474, 39.546413305265844],
      // Esquina inferior izquierda
      [-0.3047859177754227, 39.54559671056683],
      // Esquina inferior derecha
      [-0.30308261700488237, 39.544666961529806],
      // Esquina superior derecha
      [-0.30240002081593925, 39.5454884864518],
      // Cierre de área/polígono
      [-0.30403314814649474, 39.546413305265844],
    ],
  ]);
  
  const railsLine1 = turf.lineString([
    [-0.30312682964828164, 39.544762908105746],
    [-0.3047495659868359, 39.545608847808396],
  ]);
  const railsLine2 = turf.lineString([
    [-0.3046884806523799, 39.54566590278616],
    [-0.3030447754197863, 39.54480564170525],
  ]);
  const railsLine3 = turf.lineString([
    [-0.3046684364138893, 39.54569290750886],
    [-0.3030491378463092, 39.54485619923592],
  ]);
  const railsLine4 = turf.lineString([
    [-0.30460458277503805, 39.545777395635916],
    [-0.30299532504050763, 39.544925564165965],
  ]);
  const railsLine5 = turf.lineString([
    [-0.30456626666315423, 39.54581178291675],
    [-0.3029377738134202, 39.5449744106087],
  ]);
  const railsLine6 = turf.lineString([
    [-0.3044995202510801, 39.545889326157166],
    [-0.3028789671189388, 39.545038628089124],
  ]);
  const railsLine7 = turf.lineString([
    [-0.30446125411907426, 39.545931267214506],
    [-0.3028464664665206, 39.54507927658403],
  ]);
  
  const allRailsLines = [
    railsLine1,
    railsLine2,
    railsLine3,
    railsLine4,
    railsLine5,
    railsLine6,
    railsLine7,
  ];
  
  // Función que retorna los datos de los polígonos y rails
const obtenerPoligonosYLines = () => {
    return {
      exteriorPolygon,
      interiorPolygon,
      allRailsLines,
    };
  };
  
  module.exports = {
    obtenerPoligonosYLines,
  };