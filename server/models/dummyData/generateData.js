///////////////////// LISTINGS DATA ////////////////////////////

//// Generate 100 points within a polygon of Central London ////

const randomPointsOnPolygon = require('random-points-on-polygon');
const turf = require('turf');

var polygon = turf.polygon([[
  [-.2451, 51.5194],
  [-.1960, 51.5485],
  [-.1040, 51.5485],
  [-.0700, 51.5331],
  [-.0632, 51.5132],
  [-.0748, 51.5089],
  [-.1095, 51.5128],
  [-.1218, 51.5108],
  [-.1281, 51.4972],
  [-.1428, 51.4867],
  [-.1665, 51.4869],
  [-.1850, 51.4811],
  [-.2451, 51.5194]
]]);

let numberOfPoints = 100;
var points = randomPointsOnPolygon(numberOfPoints, polygon);

let coords = [];

for (let i = 0; i < points.length; i++) {
  // reverse order to lat-long instead long-lat
  let latLong = [points[i].geometry.coordinates[1], points[i].geometry.coordinates[0]]
  coords.push(latLong)
}

////// Add the points onto the listingsData from Mockaroo //////

let listingsData = require('./listingsData_no_coords').listingsArray;

listingsData.forEach((listing, index) => {
  listing.listingLat = coords[index][0];
  listing.listingLong = coords[index][1];
})

exports.listingsData = listingsData;


