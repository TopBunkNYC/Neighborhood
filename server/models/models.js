const db = require('../../database/index');
const Sequelize = require('sequelize');

const Listing = db.define('listing', {
  id: {
    type: Sequelize.NUMBER
  },
  listingId: {
    type: Sequelize.NUMBER
  },
  neighbId: {
    type: Sequelize.NUMBER
  }, 
  listingLat: {
    type: Sequelize.FLOAT
  },
  listingLong: {
    type: Sequelize.FLOAT
  },
  neighbDesc: {
    type: Sequelize.STRING
  },
  gettingAroundDesc: {
    type: Sequelize.STRING
  }
})

// Placeholders
const Neighborhood = null;
const Landmarks = null;