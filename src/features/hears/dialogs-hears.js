/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { GENERIC_STEP_DIALOG_ID } = require('@feature/dialogs/util/constants')

module.exports = function (controller) {

    controller.hears(['ayuda', 'help'], 'message', async (bot, message) => {
        await bot.beginDialog(GENERIC_STEP_DIALOG_ID, message.user_profile);
    });
}