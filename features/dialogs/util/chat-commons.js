const { getRandomInt, resolveGreeting } = require('@util/commons');
const { typing } = require('@util/bot.typing');
const { i18n } = require('@util/lang');
const personal = ['María', 'Isabella', 'Jimena', 'Laura'];
const { infoQuickReplies } = require('./info-quick-replies');
const { BOT_CLIENT_RED_COFIDI__ID, BOT_CLIENT_PAC_WEB__ID } = require('./constants')

greetings = async function (bot, message, basteText) {
    await typing(bot, message, resolveGreeting());
    await typing(bot, message, basteText);
    if (message.user_profile && message.user_profile.context == BOT_CLIENT_RED_COFIDI__ID) {
        await typing(bot, message, 'Red COFIDI es un servicio para intercambiar Comprobantes Fiscales Digitales de una manera rápida y segura.');
    } else if (message.user_profile && message.user_profile.context == BOT_CLIENT_PAC_WEB__ID) {
        await typing(bot, message, 'PAC Web es un servicio de ATEB para apoyar a sus clientes.');
    } else {
        if (message.user_profile && message.user_profile.context) {
            await typing(bot, message, message.user_profile.context + ' es un servicio de ATEB para apoyar a sus clientes.');
        } else {
            await typing(bot, message, 'No me encuentro ejecutando en un contexto correcto, por favor avise a mis creadores');
        }
    }
    if (message.user_profile && message.user_profile.asistente) {
        await typing(bot, message, 'Mi nombre es ' + message.user_profile.asistente);
    }
    await typing(bot, message, {
        text: i18n('Hello', 'en'),
        quick_replies: infoQuickReplies
    });
}

/**
 * This is the hello event
 */
exports.hello = async function (bot, message) {
    await greetings(bot, message, 'Bienvenido a ATEB');
}

/**
 * This is the welcome_back event
 */
exports.welcomeBack = async function (bot, message) {
    await greetings(bot, message, 'Bienvenido de nuevo a ATEB');
}

