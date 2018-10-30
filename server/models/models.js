const db = require('../../database/index');
const Sequelize = require('sequelize');
const turf = require('@turf/turf');
const distance = require('@turf/distance');

// Define Listing schema
const Listing = db.define('listing', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  listingId: {
    type: Sequelize.INTEGER
  },
  hostFirstName: {
    type: Sequelize.STRING(50)
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
    type: Sequelize.STRING(50)
  },
  feature2: {
    type: Sequelize.STRING(50)
  },
  feature3: {
    type: Sequelize.STRING(50)
  },
  feature4: {
    type: Sequelize.STRING(50)
  },
  feature5: {
    type: Sequelize.STRING(50)
  },
  feature6: {
    type: Sequelize.STRING(50)
  },
  feature7: {
    type: Sequelize.STRING(50)
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
  },
  distance: {
    type: Sequelize.FLOAT
  }
});

//////// DATABASE METHODS ////////////

const getListingData = (id) => {
  return Listing.findAll({
    where: {
      listingId: id
    }
  })
}

const getNeighbData = (id) => {
  return Neighborhood.findAll({
    where: {id}
  })
}

const getNearestLandmarks = (latLong) => {
  console.log('input of latlong at very beginning of model is ', latLong)
  Landmark.findAll()
  .then((landmarks) => {
    // console.log('landmarks on models look like', landmarks[0]);
    latLong = JSON.parse(latLong);

    return decoratedLandmarks = landmarks.map((landmark) => {
      let from = turf.point([latLong.lng, latLong.lat]);
      let to = turf.point([landmark.landmarkLong, landmark.landmarkLat]);
      let options = {units: 'miles'};
      console.log('distance is ', turf.distance(from, to, options))

      return Landmark.build({
        id: landmark.id,
        landmarkName: landmark.landmarkName,
        distance: turf.distance(from, to, options)
      })
    })

    console.log('decoratedLandmarks looks like', decoratedLandmarks[0]);


  })
  .then((decoratedLandmarks) => {
    decoratedLandmarks.sort((a, b) => {
      //return Landmark.get(distance) for a - Landmark.get(distance) for b
    })

    // return decoratedLandmarks.slice(0, 5)
  })
}


exports.getListingData = getListingData;
exports.getNeighbData = getNeighbData;
exports.getNearestLandmarks = getNearestLandmarks;

exports.listingSchema = Listing;
exports.neighborhoodSchema = Neighborhood;
exports.landmarkSchema = Landmark;

// const getLandmarkData = () => {
//   return Landmark.findAll()
// }
// exports.getLandmarkData = getLandmarkData;
