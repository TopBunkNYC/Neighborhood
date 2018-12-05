// require('newrelic');
import "newrelic";
import express from "express";
import path from "path";
import parser from "body-parser";
import cluster from "cluster";

let port = process.env.PORT || 5001;

import router from "./routes/router";

// require db, which will initialize it even if `db` is not used anywhere else
import db from "../database/index";

// if (cluster.isMaster) {
// 	let cpuCount = require('os').cpus().length;

// 	for (var i = 0; i < cpuCount; i += 1) {
// 		cluster.fork();
// 	}
// } else {
  let app = express();

  app.use(express.static(path.join(__dirname, "../public")));
  app.use(parser.json());
  app.use(
    parser.urlencoded({
      extended: true
    })
  );
  app.use("/", router);

  app.listen(port, () => {
    console.log(`server running at: http://localhost:${port}`);
  });
// }
