const models = require('../models/models');

// This module will be populated with methods to fulfill requests from the client
// It can invoke the models to do so
module.exports = {
  getListingData: (req, res) => { 
    models.getListingData(req.query.id)
    .then((listing) => {
      res.send(listing);
    })
    .catch((err) => {
      console.error(err);
    })
  }, 

  getNeighbData: (req, res) => {
    models.getNeighbData(req.query.id)
    .then((neighborhood) => {
      res.send(neighborhood);
    })
    .catch((err) => {
      console.error(err);
    })
  },

  getLandmarkData: (req, res) => {
    models.calcNearestLandmarks(req.query.listingLocation)
    .then(models.getLandmarkData()
    .then((landmarks) => {
      res.send(landmarks);
    }))
    .catch((err) => {
      console.error(err);
    })
  }
}