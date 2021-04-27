/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { RFC_DIALOG_ID } = require('@feature/dialogs/util/constants')

module.exports = function (controller) {
    controller.hears('pasos-dialog', 'message', async (bot, message) => {
        await bot.beginDialog(RFC_DIALOG_ID, message.user_profile);
    });
}