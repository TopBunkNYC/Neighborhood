const Sequelize = require('sequelize');
const password = require('../config.js').DB_PASSWORD;

const db  = new Sequelize('neighborhood', 'kai', password, {
	dialect: 'postgres',
	pool: {
		max: 30,
		min: 0,
		idle: 10000000,
		acquire: 10000000
	}		
});


db.authenticate()
  .then(() => {
    console.log('PostgreSQL connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;