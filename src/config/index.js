'use strict';

const dotenv = require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = process.env.NODE_ENV;
const config = require('@config/default.json')[env];

/**
 * Mysql database configuration
 */
config.vtiger.host = process.env.MYSQL_HOST || config.vtiger.host || 'localhost';
config.vtiger.database = process.env.MYSQL_DB || config.vtiger.database || 'develop';
config.vtiger.username = process.env.MYSQL_USERNAME || config.vtiger.username || 'admin';
config.vtiger.password = process.env.MYSQL_PASSWORD || config.vtiger.password || 'admin';

/**
 * Bot default configurations
 */

config.bot.app.port = parseInt(process.env.PORT) || config.bot.app.port || 3000;
config.bot.app.typingdelay = parseInt(process.env.TYPING_DELAY) || config.bot.app.typingdelay || 2000;
config.bot.app.nextlabel = process.env.PAGINATOR_NEXT_LABEL || config.bot.app.nextlabel || 'ver-mas';
config.bot.db.core = process.env.MONGO_URI || config.bot.db.core || 'mongodb://localhost:27017';
config.bot.db.kbase = process.env.MONGO_KB_URI || config.bot.db.kbase || 'mongodb://localhost:27017';
config.bot.cms.uri = process.env.CMS_URI || config.bot.cms.uri || '';
config.bot.cms.token = process.env.CMS_TOKEN || config.bot.cms.token || '';

/**
 * User service configuration
 * 
 */
config.bot.app.userservice = process.env.USER_SERVICE || config.bot.app.userservice || 'default';


/**
 * Cache configuration
 * 
 */
const defaultTTL = 1; //default to 1 Hour
const defaultCheckperiod = defaultTTL * 0.2;

config.cache.ttl = parseInt(process.env.CACHE_TTL) || config.cache.ttl || defaultTTL;
config.cache.checkperiod = parseInt(process.env.CACHE_CHECK_PERIOD) || config.cache.checkperiod || defaultCheckperiod;

if (process.env.BOT_DEBUG) {
    console.debug(config);
}

module.exports = config;
