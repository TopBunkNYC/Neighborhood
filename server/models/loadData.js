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

//////////// PLACEHOLDER FOR INITIALIZING TABLES //////////////
// force: true will drop the table if it already exists
// User.sync({force: true}).then(() => {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });