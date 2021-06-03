'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { config } = require('@config');
const db = {};

if (config.bot.app.userservice == 'vtiger') {
  let sequelize = new Sequelize(config.vtiger.database, config.vtiger.username, config.vtiger.password, config.vtiger);

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

}
