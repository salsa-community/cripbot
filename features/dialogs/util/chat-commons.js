const { getRandomInt, resolveGreeting } = require('../../../util/commons');
const personal = ['María', 'Isabella', 'Jimena', 'Laura'];
const { infoQuickReplies } = require('./info-quick-replies');
const { BOT_CLIENT_RED_COFIDI__ID, BOT_CLIENT_PAC_WEB__ID } = require('./constants')
const { typing } = require('../../../util/bot.typing');

/**
 * This is the hello event
 */
exports.hello = async function (bot, message) {
    await typing(bot, message, resolveGreeting());
    await typing(bot, message, 'Bienvenido a ATEB');
    if (message.user == BOT_CLIENT_RED_COFIDI__ID) {
        await typing(bot, message, 'Red COFIDI es un servicio para intercambiar Comprobantes Fiscales Digitales de una manera rápida y segura.');
    } else if (message.user == BOT_CLIENT_PAC_WEB__ID) {
        await typing(bot, message, 'PAC Web es un servicio de ATEB para apoyar a sus clientes.');
    } else {
        await typing(bot, message, message.user + ' es un servicio de ATEB para apoyar a sus clientes.');
    }
    await typing(bot, message, 'Mi nombre es ' + message.user_profile.asistente);
    await typing(bot, message, {
        text: '¿Requiere ayuda con el servicio?',
        quick_replies: infoQuickReplies
    });
}

/**
 * This is the welcome_back event
 */
exports.welcomeBack = async function (bot, message) {
    await typing(bot, message, resolveGreeting());
    await typing(bot, message, 'Bienvenido de nuevo a ATEB');
    if (message.user == BOT_CLIENT_RED_COFIDI__ID) {
        await typing(bot, message, 'Red COFIDI es un servicio para intercambiar Comprobantes Fiscales Digitales de una manera rápida y segura.');
    } else if (message.user == BOT_CLIENT_PAC_WEB__ID) {
        await typing(bot, message, 'PAC Web es un servicio de ATEB para apoyar a sus clientes.');
    } else {
        await typing(bot, message, message.user + ' es un servicio de ATEB para apoyar a sus clientes.');
    }
    await typing(bot, message, 'Mi nombre es ' + message.user_profile.asistente);
    await typing(bot, message, {
        text: '¿Requiere ayuda con el servicio?',
        quick_replies: infoQuickReplies
    });
}