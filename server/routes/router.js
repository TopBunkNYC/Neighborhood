import express from "express";
import controller from "../controllers/main";
import path from "path";
import fs from "fs";
import React from 'react';
import ReactDOMServer from "react-dom/server";
import Neighborhood from "../../client/components/Index.jsx";

let router = express.Router();
router.get("/listingdata", controller.getListingData);
router.post("/listingdata", controller.postListingData);
router.put("/listingdata", controller.updateListingData);
router.delete("/listingdata", controller.deleteListingData);

router.get("/neighborhooddata", controller.getNeighbData);
router.get("/landmarkdata", controller.getLandmarkData);
router.get("/app.js", (req, res) => {
  res.redirect("../../public/app.js");
});
router.get("/*", (req, res) => {
  const app = ReactDOMServer.renderToString(<Neighborhood />);
  const indexFile = path.resolve("./public/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

module.exports = router;
