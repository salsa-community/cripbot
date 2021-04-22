//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the cripbot.

// Import Botkit's core features

require('module-alias/register');
const config = require('@config');

const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');

// Import a platform-specific adapter for web.

const { WebAdapter } = require('botbuilder-adapter-web');

const { MongoDbStorage } = require('botbuilder-storage-mongodb');

// Load process.env values from .env file

let storage = null;
if (config.bot.db.core) {
    storage = mongoStorage = new MongoDbStorage({
        url: config.bot.db.core,
    });
}

// Set up mongoose connection
var mongoose = require('mongoose');
mongoose.connect(config.bot.db.kbase, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const adapter = new WebAdapter({});


const controller = new Botkit({
    debug: true,
    webhook_uri: '/api/messages',
    adapter: adapter,
    storage
});

if (process.env.CMS_URI) {
    controller.usePlugin(new BotkitCMSHelper({
        uri: process.env.CMS_URI,
        token: process.env.CMS_TOKEN,
    }));
}

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');
    controller.loadModules(__dirname + '/features/dialogs');
    controller.loadModules(__dirname + '/features/events');
    controller.loadModules(__dirname + '/features/hears');
    controller.loadModules(__dirname + '/features/interrupts');
    controller.loadModules(__dirname + '/features/middlewares');
    controller.loadModules(__dirname + '/features/controllers');

    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
        controller.on('message,direct_message', async (bot, message) => {
            let results = false;
            results = await controller.plugins.cms.testTrigger(bot, message);

            if (results !== false) {
                // do not continue middleware!
                return false;
            }
        });
    }

});

