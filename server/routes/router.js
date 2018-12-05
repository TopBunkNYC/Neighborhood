import express from "express";
import controller from "../controllers/main";
import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Neighborhood from "../../client/components/Index.jsx";
import client from "../../database-redis/index.js";
import regeneratorRuntime from "regenerator-runtime";
import models from "../models/models";

let router = express.Router();

router.get("/listingdata", cache, controller.getListingData);
router.post("/listingdata", controller.postListingData);
router.put("/listingdata", controller.updateListingData);
router.delete("/listingdata", controller.deleteListingData);

router.get("/neighborhooddata", controller.getNeighbData);
router.get("/landmarkdata", controller.getLandmarkData);
router.get("/app.js", (req, res) => {
  res.redirect("../../public/app.js");
});

const ssr = async id => {
	let props = await models.getData(id);
	let component = await React.createElement(Neighborhood, props);
	let ssr_html = await ReactDOMServer.renderToString(component);
	console.log(props)
  return { ssr_html, props };
};

router.get('/renderNeighbs', (req, res) => {
  ssr(req.query.id)
		.then((results) => {
			res.send(results);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send();
		});
});

router.get("/*", async (req, res) => {
	let props = await models.getData(req.query.id);
  const app = ReactDOMServer.renderToString(React.createElement(Neighborhood, props));
	const indexFile = path.resolve("./public/index.html");
	
  await fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error");
    }
    return res.send(
      data.replace(
        '<div id="neighborhood"></div>',
        `<div id="neighborhood">${app}</div>`
      )
    );
  });
});

function cache(req, res, next) {
  const id = req.query.id;
  client.get(id, function(err, data) {
    if (err) throw err;

		if (data != null) {
      res.send(data);
    } else {
      next();
    }
  });
}




module.exports = router;
