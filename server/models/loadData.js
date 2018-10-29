const models = require('./models.js');
const generatedListings = require('./dummyData/generateListingsData.js');
const generatedLandmarks = require('./dummyData/generateLandmarksData.js');
const Listing = models.listingSchema;
const Neighborhood = models.neighborhoodSchema;
const Landmark = models.landmarkSchema;

// Import arrays of data
const listings = generatedListings.listingsData;
const neighbs = require('./dummyData/neighbsData.js').neighbsArray;
const landmarks = generatedLandmarks.landmarksData;

Listing.sync({force: true})
.then(() => {
  Listing.bulkCreate(listings)
})
.catch((err) => {
  console.error(err);
})

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
