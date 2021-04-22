const { resolveGreeting } = require('@util/commons');
const { typing } = require('@util/bot.typing');
const { i18n } = require('@util/lang');
const { infoQuickReplies } = require('./info-quick-replies');
const { normalize, resolveProp } = require('@util/commons');

const ContextService = require('@service/context/context.service')

resolveWelcome = function (isFirstime, lang, organizacion) {
    let baseText = null;
    if (isFirstime) {
        baseText = i18n('welcome.firstime %s', lang, organizacion);
    } else {
        baseText = i18n('welcome.again %s', lang, organizacion);
    }
    return baseText;
}

greetings = async function (bot, message, isFirstime) {

    let context = await ContextService.getContext(message.user_profile.context);
    let baseText = resolveWelcome(isFirstime, message.user_profile.lang, context.organizacion);
    let objetivoProp = resolveProp('objetivo', message.user_profile.lang);
    let objetivo = normalize(context[objetivoProp]);

    await typing(bot, message, resolveGreeting(message.user_profile.lang));
    await typing(bot, message, baseText);
    await typing(bot, message, objetivo);

    if (message.user_profile && message.user_profile.asistente) {
        await typing(bot, message, i18n('welcome.name', message.user_profile.lang) + ' ' + message.user_profile.asistente);
    }
    await typing(bot, message, {
        text: i18n('welcome.question', message.user_profile.lang),
        quick_replies: infoQuickReplies(message.user_profile.lang)
    });
}

/**
 * This is the hello event
 */
exports.hello = async function (bot, message) {
    await greetings(bot, message, true);
}

/**
 * This is the welcome_back event
 */
exports.welcomeBack = async function (bot, message) {
    await greetings(bot, message, false);
}

