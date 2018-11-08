///////////////////// LISTINGS DATA ////////////////////////////
//// Generate 100 points within a polygon of Central London ////

const randomPointsOnPolygon = require('random-points-on-polygon');
const turf = require('turf');
const faker = require('faker');


var polygon = turf.polygon([[
  [-.2451, 51.5194], [-.1960, 51.5485],
  [-.1040, 51.5485], [-.0700, 51.5331],
  [-.0632, 51.5132], [-.0748, 51.5089],
  [-.1095, 51.5128], [-.1218, 51.5108],
  [-.1281, 51.4972], [-.1428, 51.4867],
  [-.1665, 51.4869], [-.1850, 51.4811],
  [-.2451, 51.5194]
]]);

let numberOfPoints = 100;
var points = randomPointsOnPolygon(numberOfPoints, polygon);

let listingsCoords = [];


for (let i = 0; i < points.length; i++) {
  // reverse order to lat-long instead long-lat
  let latLong = [points[i].geometry.coordinates[1], points[i].geometry.coordinates[0]]
  listingsCoords.push(latLong)
}


////// Add the points onto the listingsData from Mockaroo //////

let newListingsData = [];
for (let j = 0; j < 1000; j++) {
	var arr = [];
	for (let i = 0; i < 1000; i++) {
		let listing = {};
		listing.hostFirstName = faker.name.findName();
		listing.listingLat = listingsCoords[Math.floor(Math.random() * 100)][0];
		listing.listingLong = listingsCoords[Math.floor(Math.random() * 100)][1];
		listing.neighbId = Math.ceil(Math.random() * 15);
		listing.neighbDesc = faker.lorem.paragraph();
		listing.gettingAroundDesc = faker.lorem.paragraph();
		arr.push(listing)
	}
	newListingsData.push(arr);
	console.log(j);
}

exports.listingsData = newListingsData;
