const { getRandomInt } = require('../../util/commons');
const personal = ['Lucía', 'Paula', 'María', 'Isabella', 'Jimena', 'Sara', 'Laura'];
const { infoQuickReplies } = require('../replies/info-quick-replies');

/**
 * This is the hello event
 */
exports.hello = function (bot, message) {
    bot.say({ text: 'Bienvenido a ATEB' });
    bot.say({ text: 'Mi nombre es ' + personal[getRandomInt(0, personal.length - 1)] });
    bot.reply(message, {
        text: '¿Te gustaría ver información sobre nosotros?!',
        quick_replies: infoQuickReplies
    }, function () { });
}

/**
 * This is the welcome_back event
 */
exports.welcomeBack = function (bot, message) {
    bot.say({ text: 'Bienvenido de nuevo a ATEB' });
    bot.say({ text: 'Mi nombre es ' + personal[getRandomInt(0, personal.length - 1)] });
    bot.reply(message, {
        text: '¿Te gustaría ver información sobre nosotros?',
        quick_replies: [
            {
                title: 'solicitar Información',
                payload: 'rfc'
            },
        ]
    }, function () { });
}