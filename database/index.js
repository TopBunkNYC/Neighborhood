const Sequelize = require('sequelize');
const pg = require('pg');
const hstore = require('pg-hstore');

const sequelize = new Sequelize('Neighborhood', 'dweinzimmer', '', 
  {
    host: 'localhost',
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

sequelize
  .authenticate()
  .then(() => {
    console.log('Postgres connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

