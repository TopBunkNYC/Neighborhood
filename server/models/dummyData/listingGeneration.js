////////////Generate Listings///////////////
const randomPointsOnPolygon = require("random-points-on-polygon");
const turf = require("turf");
const faker = require("faker");
const fs = require("fs");
const Json2csvParser = require("json2csv").Parser;
const { performance } = require("perf_hooks");
const stream = fs.createWriteStream("data.csv");

var t0 = performance.now();
var prev = t0;

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

const fields = [
  "hostFirstName",
  "listingLat",
  "listingLong",
  "neighbId",
  "neighbDesc",
  "gettingAroundDesc",
  "createdAt",
  "updatedAt"
];

var opts = { fields: fields, header: false };

const json2csvParser = new Json2csvParser(opts);

(async () => {
  for (var i = 0; i < 1000; i++) {
    await new Promise((resolve, reject) => {
      let arr = [];
      for (var j = 0; j < 10000; j++) {
        arr.push({
          hostFirstName: faker.name.findName(),
          listingLat: listingsCoords[Math.floor(Math.random() * 100)][0],
          listingLong: listingsCoords[Math.floor(Math.random() * 100)][1],
          neighbId: Math.ceil(Math.random() * 15),
          neighbDesc: faker.lorem.paragraph(),
          gettingAroundDesc: faker.lorem.paragraph(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      resolve(arr);
    }).then(async listings => {
      let csv = json2csvParser.parse(listings);
      await stream.write(csv + "\n");
      console.log(
        "Load " + i + " took " + (performance.now() - prev) / 1000 + " seconds."
      );
      prev = performance.now();
    });
  }
  stream.end();
  var t1 = performance.now();
  console.log("Generation took " + (t1 - t0) / 1000 + " seconds.");
})();

//Initialize listings table

const models = require("../models.js");
const Listing = models.listingSchema;
Listing.sync({ force: true });

