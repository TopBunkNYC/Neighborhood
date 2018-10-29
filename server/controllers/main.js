const models = require('../models/models');

// This module will be populated with methods to fulfill requests from the client
// It can invoke the models to do so
module.exports = {
  getListingData: (req, res) => { 
    console.log('req.query.id is:', req.query.id)

    models.getListingData(req.query.id)
    .then((listing) => {
      res.send(listing);
    })
    .catch((err) => {
      console.error(err);
    })
  }, 

  getNeighbData: (req, res) => {
    models.getNeighbData()
    .then((neighborhoods) => {
      res.send(neighborhoods);
    })
    .catch((err) => {
      console.error(err);
    })
  },

  getLandmarkData: (req, res) => {
    models.getLandmarkData()
    .then((landmarks) => {
      res.send(landmarks);
    })
    .catch((err) => {
      console.error(err);
    })
  }
}