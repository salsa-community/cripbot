/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { helpQuickReplies } = require('@feature/dialogs/util/info-quick-replies');
const { typing } = require('@util/bot.typing');
const { i18n } = require('@util/lang');

module.exports = function (controller) {
    controller.hears(['hey', 'hi', 'hello', 'hola'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.hello', message.user_profile.lang));
    });

    controller.hears(['[¿]?eres real[?]?', 'quien eres', 'who are you'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('bot.whoare', message.user_profile.lang));
    });

    controller.hears(['como te llamas', '[¿]?tienes nombre[?]?', '[¿]cual es tu nombre[?]?', 'nombre', 'name'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('bot.name', message.user_profile.lang, message.user_profile.asistente));
    });

    controller.hears(['[¿]?c[oó]mo est[áa]s[?]?', 'who are you'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('bot.state', message.user_profile.lang));
        await bot.reply(message, {
            text: i18n('help.question', message.user_profile.lang),
            quick_replies: helpQuickReplies(message.user_profile.lang)
        });
    });

    controller.hears(['good morning', 'morning', 'good night', 'good afternoon', 'buenos dias', 'buenas noches', 'buenas tardes'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.nice-to-see-you', message.user_profile.lang));
        await bot.reply(message, {
            text: i18n('help.question', message.user_profile.lang),
            quick_replies: helpQuickReplies(message.user_profile.lang)
        });
    });

    controller.hears(['adios', 'a dios', 'hasta pronto', 'bye', 'see you', 'hasta luego'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.attended', message.user_profile.lang));
    });


    controller.hears(['no', 'no gracias', 'en otro momento', 'no thanks', 'no thank you'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.negative', message.user_profile.lang));
        await bot.reply(message, i18n('help.be-online', message.user_profile.lang));
    });

    controller.hears(['gracias', 'thank you', 'thanks'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.attended-alternative', message.user_profile.lang));
    });

}