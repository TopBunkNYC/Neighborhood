const models = require('../models/models');

// This module will be populated with methods to fulfill requests from the client
// It can invoke the models to do so
module.exports = {
  getListingData: (req, res) => { res.send('hello, listingdata!') }
}