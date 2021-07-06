const { resolveGreeting } = require('@util/commons');
const { typing } = require('@util/bot.typing');
const { i18n } = require('@util/lang');
const { normalize, resolveProp, arrayToReplies } = require('@util/commons');

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
    //let baseText = resolveWelcome(isFirstime, message.user_profile.lang, context.organizacion);
    let descProp = resolveProp('desc', message.user_profile.lang);

    //await bot.reply(message, resolveGreeting(message.user_profile.lang));
    //await bot.reply(message, baseText);

    let messageWithReplay = undefined;
    for (let index = 0; index < context.mensajes.length; index++) {
        if (context.mensajes[index].replies && context.mensajes[index].replies.length > 0) {
            console.log(context.mensajes[index].replies);
            messageWithReplay = context.mensajes[index];
        } else {
            let mensaje = context.mensajes[index][descProp]
                .replace(/\$ORGANIZACION/gi, context.organizacion)
                .replace(/\$CONTEXTO/gi, context.nombre);
            await bot.reply(message, normalize(mensaje));
        }
    }

    if (messageWithReplay) {
        await bot.reply(message,
            {
                text: normalize(messageWithReplay[descProp]),
                quick_replies: arrayToReplies(messageWithReplay.replies)
            });
    }

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

