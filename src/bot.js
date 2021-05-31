//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the cripbot.

// Import Botkit's core features

require('module-alias/register');
const { config } = require('@config');

const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');

// Import a platform-specific adapter for web.

const { WebAdapter } = require('botbuilder-adapter-web');

const { MongoDbStorage } = require('botbuilder-storage-mongodb');
const { MongoClient, Logger } = require('mongodb');


async function initBotStorage() {

    const mongoClient = new MongoClient(config.bot.db.core.uri, { useUnifiedTopology: true });
    Logger.setLevel(config.bot.db.core.loggerLevel);
    await mongoClient.connect();
    const collection = MongoDbStorage.getCollection(mongoClient);
    return new MongoDbStorage(collection);

}


function initKbaseStorage() {

    var mongoose = require('mongoose');
    if (config.bot.db.kbase.loggerLevel === 'debug') {
        mongoose.set('debug', { shell: true });
    }
    mongoose.connect(config.bot.db.kbase.uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

}


(async () => {

    try {
        let storage = null;

        if (config.bot.db.core.uri) {
            storage = await initBotStorage();
        }

        initKbaseStorage();

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

        controller.ready(() => {

            // load traditional developer-created local custom feature modules
            controller.loadModules(__dirname + '/features');
            controller.loadModules(__dirname + '/features/dialogs');
            controller.loadModules(__dirname + '/features/events');
            controller.loadModules(__dirname + '/features/hears');
            controller.loadModules(__dirname + '/features/interrupts');
            controller.loadModules(__dirname + '/features/middlewares');
            controller.loadModules(__dirname + '/features/controllers');

        });

    } catch (ex) {
        console.error(ex);
    }
})();

