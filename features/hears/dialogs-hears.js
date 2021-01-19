/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { helpQuickReplies } = require('../dialogs/util/info-quick-replies');
const { typing } = require('../../util/bot.typing');
const { RFC_DIALOG_ID, BOT_CLIENT_PAC_WEB__ID, BOT_CLIENT_RED_COFIDI__ID } = require('../dialogs/util/constants')

module.exports = function (controller) {
    controller.hears('rfc-dialog', 'message', async (bot, message) => {
        await bot.beginDialog(RFC_DIALOG_ID, message.user_profile);
    });
}