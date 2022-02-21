/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { typing } = require('@util/bot.typing');
const { i18n } = require('@util/lang');

module.exports = function (controller) {
    controller.hears(['hola'], 'message', async (bot, message) => {
        await typing(bot, message, i18n('help.hello', message.user_profile.lang));
    });
}