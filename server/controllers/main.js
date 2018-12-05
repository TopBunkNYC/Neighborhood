const models = require('../models/models');
const cluster = require("cluster");
import client from "../../database-redis/index.js";

// This module will be populated with methods to fulfill requests from the client
// It can invoke the models to do so
module.exports = {
  getListingData: (req, res) => { 
    models.getListingData(req.query.id)
    .then((listing) => {
			client.setex(req.query.id, 60, JSON.stringify(listing));
			// console.log('Worker %d running!', cluster.worker.id)
      res.send(listing);
    })
    .catch((err) => {
      console.error(err);
    })
  }, 

	postListingData: (req, res) => { 
		models.postListingData(req.body)
    .then(() => {
      res.send();
    })
    .catch((err) => {
      console.error(err);
    })
	}, 
	
	updateListingData: (req, res) => { 
		models.updateListingData(req.body)
    .then(() => {
      res.send('update success');
    })
    .catch((err) => {
      console.error(err);
    })
	}, 
	
	deleteListingData: (req, res) => { 
		models.deleteListingData(req.body.id)
    .then(() => {
      res.send("delete success");
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
    models.calcNearestLandmarks(req.query.listingLat, req.query.listingLong)
    .then(models.getLandmarkData()
    .then((landmarks) => {
      res.send(landmarks);
    }))
    .catch((err) => {
      console.error(err);
    })
  }
}