const Sequelize = require('sequelize');
const password = require('../config.js').DB_PASSWORD;

const db  = new Sequelize('neighborhood', 'postgres', password, {
	host: "3.16.206.192",
	dialect: 'postgres',
	pool: {
		max: 1000,
		min: 0,
		idle: 10000,
		acquire: 10000
	},
	logging: false		
});


db.authenticate()
  .then(() => {
    console.log('PostgreSQL connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;



