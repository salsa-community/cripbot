const { getRandomInt, resolveGreeting } = require('@util/commons');
const { typing } = require('@util/bot.typing');
const { i18n } = require('@util/lang');
const personal = ['María', 'Isabella', 'Jimena', 'Laura'];
const { infoQuickReplies } = require('./info-quick-replies');
const { BOT_CLIENT_RED_COFIDI__ID, BOT_CLIENT_PAC_WEB__ID } = require('./constants')

greetings = async function (bot, message, basteText) {
    await typing(bot, message, resolveGreeting(message.user_profile.lang));
    await typing(bot, message, basteText);
    if (message.user_profile && message.user_profile.context == BOT_CLIENT_RED_COFIDI__ID) {
        await typing(bot, message, i18n('redcofidi.objetivo', message.user_profile.lang));
    } else if (message.user_profile && message.user_profile.context == BOT_CLIENT_PAC_WEB__ID) {
        await typing(bot, message, i18n('pacweb.objetivo', message.user_profile.lang));
    } else {
        if (message.user_profile && message.user_profile.context) {
            await typing(bot, message, message.user_profile.context + i18n('context.objetivo', message.user_profile.lang));
        } else {
            await typing(bot, message, i18n('context.notfound', message.user_profile.lang));
        }
    }
    if (message.user_profile && message.user_profile.asistente) {
        await typing(bot, message, i18n('welcome.name', message.user_profile.lang) + ' ' + message.user_profile.asistente);
    }
    await typing(bot, message, {
        text: i18n('welcome.question', message.user_profile.lang),
        quick_replies: infoQuickReplies
    });
}

/**
 * This is the hello event
 */
exports.hello = async function (bot, message) {
    await greetings(bot, message, i18n('welcome.firstime', message.user_profile.lang));
}

/**
 * This is the welcome_back event
 */
exports.welcomeBack = async function (bot, message) {
    await greetings(bot, message, i18n('welcome.again', message.user_profile.lang));
}

