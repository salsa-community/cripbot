const { i18n } = require('@util/lang');
const { normalize, resolveProp, arrayToReplies, resolveMessage } = require('@util/commons');
const { GET_NAME_DIALOG_ID } = require('@feature/dialogs/util/constants')

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
        if (
            index == context.mensajes.length - 1
            && context.mensajes[index].replies
            && context.mensajes[index].replies.length > 0
        ) {
            messageWithReplay = context.mensajes[index];
        } else {
            let mensaje = resolveMessage(context.mensajes[index][descProp], context);
            await bot.reply(message, normalize(mensaje));
        }
    }

    if (messageWithReplay) {
        let mensaje = resolveMessage(messageWithReplay[descProp], context);
        await bot.reply(message,
            {
                text: normalize(mensaje),
                quick_replies: arrayToReplies(messageWithReplay.replies)
            });
    }

}

/**
 * This is the hello event
 */
exports.hello = async function (bot, message) {
    if (!message.user_profile.username) {
        await bot.beginDialog(GET_NAME_DIALOG_ID, message.user_profile);
    } else {
        await greetings(bot, message, true);
    }
}

/**
 * This is the welcome_back event
 */
exports.welcomeBack = async function (bot, message) {
    if (!message.user_profile.username) {
        await bot.beginDialog(GET_NAME_DIALOG_ID, message.user_profile);
    } else {
        await greetings(bot, message, false);
    }
}

