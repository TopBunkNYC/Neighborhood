const db = require("../../database/index");
const Sequelize = require("sequelize");
const regeneratorRuntime = require("regenerator-runtime");
const turf = require("@turf/turf");

// Define Listing schema
const Listing = db.define(
  "listing",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    hostfirstname: {
      type: Sequelize.STRING(50)
    },
    neighbid: {
      type: Sequelize.INTEGER
    },
    listinglat: {
      type: Sequelize.FLOAT
    },
    listinglong: {
      type: Sequelize.FLOAT
    },
    neighbdesc: {
      type: Sequelize.STRING(2500)
    },
    gettingarounddesc: {
      type: Sequelize.STRING(2500)
    }
  },
  {
    timestamps: false
  }
);

// Define Neighborhood schema
const Neighborhood = db.define("neighborhood", {
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
});

// Define Landmarks schema
const Landmark = db.define("landmark", {
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
Listing.sync({ force: false });
const getListingData = id => {
  return Listing.findAll({
    where: {
      id: id
    }
  });
};

const postListingData = data => {
  return Listing.create(data).then(() => {
    console.log("post success");
  });
};

const updateListingData = data => {
  return Listing.findOne({
    where: {
      id: data.id
    }
  }).then(listing => {
    listing.updateAttributes({
      neighbDesc: data.neighbDesc
    });
  });
};

const deleteListingData = id => {
  return Listing.destroy({
    where: { id: id }
  }).then(success => {
    console.log(success);
  });
};

const getNeighbData = id => {
  return Neighborhood.findAll({
    where: { id }
  });
};

const calcNearestLandmarks = async (lat, long) => {
  return await Landmark.findAll().then(landmarks => {
    return Promise.all(
      landmarks.map(landmark => {
        // from the current listing
        let from = turf.point([long, lat]);
        // to this landmark
        let to = turf.point([landmark.landmarkLong, landmark.landmarkLat]);
        let options = { units: "miles" };

        return Landmark.update(
          { distance: turf.distance(from, to, options) },
          { where: { id: landmark.id } }
        );
      })
    );
  });
};

const getLandmarkData = () => {
  return Landmark.findAll({
    order: Sequelize.literal("distance ASC"),
    limit: 5
  });
};

const getData = async id => {
  let data = {
    dataLoaded: true
  };
  await getListingData(id).then(async listings => {
		let listing = await Listing.findAll({
			where: {
				id: id
			}
		});		
		await Object.assign(data, {
      listingId: id,
      hostFirstName: listing[0].hostfirstname,
      hostNeighbDesc: listing[0].neighbdesc,
      hostGettingAroundDesc: listing[0].gettingarounddesc,
      listingLat: listing[0].listinglat,
      listingLong: listing[0].listinglong,
      neighborhoodId: listing[0].neighbid
		})
	}
  );
  await getNeighbData(id).then(async nei => {
		let id = data.neighborhoodId
		let neighbs = await Neighborhood.findAll({
			where: { id }
		});
    await Object.assign(data, {
      neighbName: neighbs[0].neighbName,
      neighbDescriptors: [
        neighbs[0].feature1,
        neighbs[0].feature2,
        neighbs[0].feature3,
        neighbs[0].feature4,
        neighbs[0].feature5,
        neighbs[0].feature6,
        neighbs[0].feature7
      ],
      city: neighbs[0].cityString,
      region: neighbs[0].regionString,
      country: neighbs[0].country
    });
  });
  await getLandmarkData().then(async lm => {
		let landmarks = await Landmark.findAll({
			order: Sequelize.literal("distance ASC"),
			limit: 5
		});	
		await Object.assign(data, {
      nearbyLandmarks: landmarks.map(x => x.dataValues)
		});
	});
	return JSON.stringify(data);
};

exports.getListingData = getListingData;
exports.postListingData = postListingData;
exports.updateListingData = updateListingData;
exports.deleteListingData = deleteListingData;

exports.getNeighbData = getNeighbData;
exports.calcNearestLandmarks = calcNearestLandmarks;
exports.getLandmarkData = getLandmarkData;

exports.listingSchema = Listing;
exports.neighborhoodSchema = Neighborhood;
exports.landmarkSchema = Landmark;

exports.getData = getData;
