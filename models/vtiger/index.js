'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};

let db_host = process.env.MYSQL_HOST || 'localhost';
let db_database = process.env.MYSQL_DB || 'becovtig';
let db_username = process.env.MYSQL_USERNAME || 'becovtiguser';
let db_password = process.env.MYSQL_PASSWORD || '5g#k@&k2p';

let sequelize = new Sequelize(db_database, db_username, db_password, {
    host: db_host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test mysql connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to Vtiger has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
