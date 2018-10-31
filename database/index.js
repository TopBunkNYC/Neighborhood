const Sequelize = require('sequelize');
const pg = require('pg');
const hstore = require('pg-hstore');
const dbpw = require('../config.js').AmazonDBpw;

const db = new Sequelize('Neighborhood', 'neighborhood', dbpw, 
  {
    host: 'neighborhood-staybnb.cksae9ebsoyz.us-east-2.rds.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  } 
)

db.authenticate()
  .then(() => {
    console.log('PostgreSQL connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;