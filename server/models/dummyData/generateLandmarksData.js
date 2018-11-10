///////////////////// LANDMARKS DATA ////////////////////////////

const randomPointsOnPolygon = require('random-points-on-polygon');
const turf = require('turf');

var polygon = turf.polygon([[
  [-.2451, 51.5194], [-.1960, 51.5485], [-.1040, 51.5485],
  [-.0700, 51.5331], [-.0632, 51.5132], [-.0748, 51.5089],
  [-.1095, 51.5128], [-.1218, 51.5108], [-.1281, 51.4972],
  [-.1428, 51.4867], [-.1665, 51.4869], [-.1850, 51.4811],
  [-.2451, 51.5194]
]]);


let landmarkNames = [
  'Tower of London', 'Fortnum & Mason\'s', 'Big Ben', 'London Eye',
  'Buckingham Palace', 'British Museum', 'Tower Bridge', 'Hyde Park',
  'St. Paul\'s Cathdedral', 'Trafalgar Square', 'Covent Garden',
  'Spitalfield\'s Market', 'London Bridge', 'Millennium Bridge',
  'Shakespeare\'s Globe Theatre', 'National Gallery', 'Piccadilly Circus',
  'The Shard', 'Victoria & Albert Museum', 'Oxford Street',
  'Natural History Museum', 'Camden Town Market', 'Portobello Road Market',
  'Regent\'s Park', 'Tate Modern', 'Borough Market', 'Notting Hill',
  'St. James\'s Park', 'London Zoo', 'Kensington Gardens',
  'Royal Observatory, Greenwich', 'Museum of London', 'Brick Lane',
  'The Royal Albert Hall', 'The Science Museum', 'Kew Gardens', 'Madame Tussauds',
  'Saatchi Gallery', 'Westminster Cathedral', 'London Aquarium'
]

let numberOfLandmarks = landmarkNames.length;

let createPoints = async () => {
  let landmarkPoints = await randomPointsOnPolygon(numberOfLandmarks, polygon);  // 40

  let landmarkCoords = []; 
  for (let i = 0; i < landmarkPoints.length; i++) {
    // reverse order to lat-long instead long-lat
    let latLong = [landmarkPoints[i].geometry.coordinates[1], landmarkPoints[i].geometry.coordinates[0]]
    landmarkCoords.push(latLong)
  }
  
  let landmarksData = [];
  
  for (let i = 0; i < landmarkCoords.length; i++) {
    let landmark = { 
      id: i + 1,
      landmarkName: landmarkNames[i],
      landmarkLat: await landmarkCoords[i][0],
      landmarkLong: await landmarkCoords[i][1]
    }
  
    landmarksData.push(landmark);
  }
  return landmarksData;
}

exports.landmarksData = createPoints();


