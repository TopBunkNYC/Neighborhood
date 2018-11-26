// require('newrelic');
// import from "newrelic"
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import parser from 'body-parser'
let port = process.env.PORT || 5001;

import router from './routes/router';

// require db, which will initialize it even if `db` is not used anywhere else
import db from '../database/index';
let app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));
app.use('/', router);

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
