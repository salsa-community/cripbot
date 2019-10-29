/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears('codigoCFDI','message', async(bot, message) => {
        await bot.reply(message, 'Por favor ingrese el código presentado en pantalla del sistema. Inicia con las siglas CFDI');
    });
}