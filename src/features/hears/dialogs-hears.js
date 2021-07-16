/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { CONTACTO_DIALOG_ID, GET_NAME_DIALOG_ID } = require('@feature/dialogs/util/constants')
const ErrorService = require('@service/error/error.service')
const { resolveOptions } = require('@util/commons');
const { i18n } = require('@util/lang');
module.exports = function (controller) {

    controller.hears(['ayuda', 'help'], 'message', async (bot, message) => {
        let errors = await ErrorService.findAllByContext(message.user_profile.context);
        await bot.reply(message, {
            text: i18n('welcome.dialog', message.user_profile.lang),
            quick_replies: resolveOptions(errors, message.user_profile.lang, true)
        });
    });

    controller.hears(['contactar con una persona', 'contactar con humano', 'contacto', 'persona'], 'message', async (bot, message) => {
        await bot.reply(message, 'contactar persona');
        await bot.beginDialog(CONTACTO_DIALOG_ID, message.user_profile);
    });

    controller.hears(['usuario-identidad'], 'message', async (bot, message) => {
        await bot.beginDialog(GET_NAME_DIALOG_ID, message.user_profile);
    });
}