const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// require db, which will initialize it even if `db` is not used anywhere else
const db = require('../database/index')

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {res.send('Hello, world')})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
