///////////////////// LISTINGS DATA ////////////////////////////
//// Generate 100 points within a polygon of Central London ////

const randomPointsOnPolygon = require("random-points-on-polygon");
const turf = require("turf");
const faker = require("faker");
const neighbs = require("./neighbsData.js").neighbsArray;
const generatedLandmarks = require("./generateLandmarksData.js");
const landmarks = generatedLandmarks.landmarksData;
const client = require("../../../database-redis/index.js");
const models = require("../models.js");
const Listing = models.listingSchema;
const Neighborhood = models.neighborhoodSchema;
const Landmark = models.landmarkSchema;


var polygon = turf.polygon([
  [
    [-0.2451, 51.5194],
    [-0.196, 51.5485],
    [-0.104, 51.5485],
    [-0.07, 51.5331],
    [-0.0632, 51.5132],
    [-0.0748, 51.5089],
    [-0.1095, 51.5128],
    [-0.1218, 51.5108],
    [-0.1281, 51.4972],
    [-0.1428, 51.4867],
    [-0.1665, 51.4869],
    [-0.185, 51.4811],
    [-0.2451, 51.5194]
  ]
]);

let numberOfPoints = 100;
var points = randomPointsOnPolygon(numberOfPoints, polygon);

let listingsCoords = [];

for (let i = 0; i < points.length; i++) {
  // reverse order to lat-long instead long-lat
  let latLong = [
    points[i].geometry.coordinates[1],
    points[i].geometry.coordinates[0]
  ];
  listingsCoords.push(latLong);
}

// Redis data load
// (async () => {
//   for (var i = 0; i < 10000; i++) {
//     await new Promise((resolve, reject) => {
//       client.rpush(
//         [
//           "listings",
//           JSON.stringify({
//             hostFirstName: faker.name.findName(),
//             listingLat: listingsCoords[Math.floor(Math.random() * 100)][0],
//             listingLong: listingsCoords[Math.floor(Math.random() * 100)][1],
//             neighbId: Math.ceil(Math.random() * 15),
//             neighbDesc: faker.lorem.paragraph(),
//             gettingAroundDesc: faker.lorem.paragraph()
//           })
//         ],
//         function(err, reply) {
//           resolve(reply);
//         }
//       );
//     });
//   }
// })();

// (async () => {
//   for (let neighb of neighbs) {
//     await new Promise((resolve, reject) => {
//       client.rpush(["neighbs", JSON.stringify(neighb)], function(err, reply) {
//         resolve(reply);
//       });
//     });
//   }
// })();

// (async () => {
//   for (let landmark of landmarks) {
//     await new Promise((resolve, reject) => {
//       client.rpush(["neighbs", JSON.stringify(landmark)], function(err, reply) {
//         resolve(reply);
//       });
//     });
//   }
// })();

//Postgres data load
(async () => {
  for (var i = 0; i < 10000; i++) {
		await new Promise((resolve, reject) => {
      let arr = [];
      for (var j = 0; j < 1000; j++) {
        arr.push({
          hostFirstName: faker.name.findName(),
          listingLat: listingsCoords[Math.floor(Math.random() * 100)][0],
          listingLong: listingsCoords[Math.floor(Math.random() * 100)][1],
          neighbId: Math.ceil(Math.random() * 15),
          neighbDesc: faker.lorem.paragraph(),
          gettingAroundDesc: faker.lorem.paragraph()
        });
      }
      resolve(arr);
    }).then(async (listings) => {
      await Listing.bulkCreate(listings);
    });
  }
})();

Neighborhood.sync({force: true})
.then(() => {
  Neighborhood.bulkCreate(neighbs)
})
.catch((err) => {
  console.error(err);
})

Landmark.sync({force: true})
.then(() => {
	Landmark.bulkCreate(landmarks)
})
.catch((err) => {
	console.error(err);
})

