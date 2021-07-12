/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { GENERIC_STEP_DIALOG_ID, CONTACTO_DIALOG_ID, GET_NAME_DIALOG_ID } = require('@feature/dialogs/util/constants')

module.exports = function (controller) {

    controller.hears(['ayuda', 'help'], 'message', async (bot, message) => {
        await bot.beginDialog(GENERIC_STEP_DIALOG_ID, message.user_profile);
    });

    controller.hears(['contactar con una persona', 'contactar con humano', 'contacto', 'persona'], 'message', async (bot, message) => {
        await bot.reply(message, 'contactar persona');
        await bot.beginDialog(CONTACTO_DIALOG_ID, message.user_profile);
    });

    controller.hears(['usuario'], 'message', async (bot, message) => {
        await bot.beginDialog(GET_NAME_DIALOG_ID, message.user_profile);
    });
}