const db = require('../../database/index');
const Sequelize = require('sequelize');

// Define Listing schema
const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  listingId: {
    type: Sequelize.INTEGER
  },
  neighbId: {
    type: Sequelize.INTEGER
  }, 
  listingLat: {
    type: Sequelize.FLOAT
  },
  listingLong: {
    type: Sequelize.FLOAT
  },
  neighbDesc: {
    type: Sequelize.STRING(2500)
  },
  gettingAroundDesc: {
    type: Sequelize.STRING(2500)
  }
})

// Define Neighborhood schema
const Neighborhood = db.define('neighborhood', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  cityString: {
    type: Sequelize.STRING(100)
  }, 
  regionString: {
    type: Sequelize.STRING(100)
  },
  country: {
    type: Sequelize.STRING(100)
  },
  neighbName: {
    type: Sequelize.STRING(100)
  },
  feature1: {
    type: Sequelize.STRING(25)
  },
  feature2: {
    type: Sequelize.STRING(25)
  },
  feature3: {
    type: Sequelize.STRING(25)
  },
  feature4: {
    type: Sequelize.STRING(25)
  },
  feature5: {
    type: Sequelize.STRING(25)
  },
  feature6: {
    type: Sequelize.STRING(25)
  },
  feature7: {
    type: Sequelize.STRING(25)
  }
})

// Define Landmarks schema
const Landmark = db.define('landmark', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  landmarkName: {
    type: Sequelize.STRING(100)
  },
  landmarkLat: {
    type: Sequelize.FLOAT
  },
  landmarkLong: {
    type: Sequelize.FLOAT
  }
});


//////////// PLACEHOLDER FOR INITIALIZING TABLES //////////////
// force: true will drop the table if it already exists
// User.sync({force: true}).then(() => {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });


//////////// PLACEHOLDER FOR DATABASE METHODS ////////////
/*
const getListingData = () => {}
const getNeighbData = () => {}
const getLandmarkData = () => {}


exports.getListingData = getListingData;
exports.getNeighbData = getNeighbData;
exports.getLandmarkData = getLandmarkData;

*/