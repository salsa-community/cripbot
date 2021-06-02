'use strict';

const dotenv = require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = process.env.NODE_ENV;
const config = require('@config/default.json')[env];

/**
 * Analytics configuration
 */

config.analytics = process.env.DISABLE_ANALYTICS || config.analytics || true;

if (process.env.DISABLE_ANALYTICS === 'true') {
    config.analytics = false;
} else {
    config.analytics = true;
}

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
if (process.env.DISABLE_STATE_STORAGE && process.env.DISABLE_STATE_STORAGE === 'true') {
    config.bot.db.core.uri = null;
} else {
    config.bot.db.core.uri = process.env.MONGO_URI || config.bot.db.core.uri || null;
}
config.bot.db.kbase.uri = process.env.MONGO_KB_URI || config.bot.db.kbase || 'mongodb://localhost:27017';
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
const defaultTTL = 1000; //default to 1 Hour
const defaultCheckperiod = defaultTTL * 0.2;

config.cache.ttl = parseInt(process.env.CACHE_TTL) || config.cache.ttl || defaultTTL;
config.cache.checkperiod = parseInt(process.env.CACHE_CHECK_PERIOD) || config.cache.checkperiod || defaultCheckperiod;

/**
 * Logger configuracion
 */

config.bot.db.core.loggerLevel = process.env.BOT_DB_CORE_LOGGER_LEVEL || config.bot.db.core.loggerLevel || 'info';
config.bot.db.kbase.loggerLevel = process.env.BOT_DB_KBASE_LOGGER_LEVEL || config.bot.db.kbase.loggerLevel || 'info';
config.bot.loggerLevel = process.env.BOT_LOGGER_LEVEL || config.bot.loggerLevel || 'info';


const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const debugFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `[${level}]: ${message} `

    if (metadata && Object.keys(metadata).length !== 0) {
        msg += JSON.stringify(metadata)
    }
    return msg
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        format.colorize(),
        splat(),
        timestamp(),
        debugFormat
    ),
    transports: [
        new transports.Console({ level: config.bot.loggerLevel }),
    ]
});

logger.debug('config', config);

module.exports = { logger, config };