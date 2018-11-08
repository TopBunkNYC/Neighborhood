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



<<<<<<< HEAD


Listing.sync({force: false})
.then(() => {
	console.log('start')
	listings.forEach(listing => {
		setTimeout(() => {
			Listing.bulkCreate(listing)
		}, 500)
=======
Listing.sync({force: true})
.then(() => {
	listings.forEach(listing => {
		setTimeout(() => Listing.create(listing), 50)
>>>>>>> 48833cd813f97d07e21603f62aac977276585d96
	})
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

landmarks.then((results) => {
  Landmark.sync({force: true})
  .then(() => {
    Landmark.bulkCreate(results)
  })
  .catch((err) => {
    console.error(err);
  })
})

