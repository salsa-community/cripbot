'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'dev';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};

config.host = process.env.MYSQL_HOST || 'localhost';
config.database = process.env.MYSQL_DB || 'develop';
config.username = process.env.MYSQL_USERNAME || 'admin';
config.password = process.env.MYSQL_PASSWORD || 'admin';

let sequelize = new Sequelize(config.database, config.username, config.password, config);

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
