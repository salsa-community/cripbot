const { Sequelize } = require('sequelize');

const UsuarioModel = require('./models/Usuario.model')

let db_host = process.env.MYSQL_HOST || 'localhost';
let db_database = process.env.MYSQL_DB || 'becovtig';
let db_username = process.env.MYSQL_USERNAME || 'becovtiguser';
let db_password = process.env.MYSQL_PASSWORD || '5g#k@&k2p';

const sequelize = new Sequelize(db_database, db_username, db_password, {
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

const Usuario = UsuarioModel(sequelize, Sequelize)

var res = Usuario.findOne({ where: { siccode: 'COPD' }, attributes: ['siccode', 'accountname'] });
res.then(result => {
    if (result) {
        console.log(result.siccode)
    } else {
        console.log('nada')
    }
}
)
module.exports = { Usuario }