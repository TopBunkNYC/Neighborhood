///////////////////// Populate Databases ////////////////////////////
const neighbs = require("./neighbsData.js").neighbsArray;
const generatedLandmarks = require("./generateLandmarksData.js");
const landmarks = generatedLandmarks.landmarksData;
const client = require("../../../database-redis/index.js");
const models = require("../models.js");
const Listing = models.listingSchema;
const Neighborhood = models.neighborhoodSchema;
const Landmark = models.landmarkSchema;
const db = require("../../../database/index.js");
const { performance } = require("perf_hooks");

var t0 = performance.now();

// Redis Listings load
(async () => {
  for (var i = 0; i < 10000000; i++) {
    await new Promise((resolve, reject) => {
      client.rpush(
        [
          "listings",
          JSON.stringify({
            hostFirstName: faker.name.findName(),
            listingLat: listingsCoords[Math.floor(Math.random() * 100)][0],
            listingLong: listingsCoords[Math.floor(Math.random() * 100)][1],
            neighbId: Math.ceil(Math.random() * 15),
            neighbDesc: faker.lorem.paragraph(),
            gettingAroundDesc: faker.lorem.paragraph()
          })
        ],
        function(err, reply) {
          resolve(reply);
        }
      );
    });
  }
  var t1 = performance.now();
  console.log("Redis load took " + (t1 - t0) / 1000 + " seconds.");
})();

//Postgres Listings load
db.query(
  `COPY listings ("hostFirstName","listingLat","listingLong","neighbId","neighbDesc","gettingAroundDesc","createdAt","updatedAt") FROM '/Users/work/Desktop/sdc/Neighborhood/server/models/dummyData/data.csv' DELIMITER ',' CSV HEADER;`,
  { model: Listing }
).then(projects => {
  console.log("success");
  var t2 = performance.now();
  console.log("Postgres copy took " + (t2 - t0) / 1000 + " seconds.");
});

// Neighborhood + Landmark Generation + Load
Neighborhood.sync({ force: true })
  .then(() => {
    Neighborhood.bulkCreate(neighbs);
    neighbs.forEach(result => {
      client.rpush(["neighbs", JSON.stringify(result)], function(err, reply) {
        console.log(reply);
      });
    });
  })
  .catch(err => {
    console.error(err);
  });

landmarks.then(results => {
  Landmark.sync({ force: true })
    .then(() => {
      Landmark.bulkCreate(results);
      results.forEach(result => {
        client.rpush(["landmarks", JSON.stringify(result)], function(
          err,
          reply
        ) {
          console.log(reply);
        });
      });
    })
    .catch(err => {
      console.error(err);
    });
});
