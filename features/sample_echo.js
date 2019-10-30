/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears('codigoCFDI','message', async(bot, message) => {
        await bot.reply(message, 'Ésta es la sección para una cuenta con un código CFDI');
    });

    controller.hears('segTicket','message', async(bot, message) => {
        await bot.reply(message, 'Seguimiento a un ticket');
    });

    controller.hears('crearTicket','message', async(bot, message) => {
        await bot.reply(message, 'Diálogo para crear un ticket');
    });

    controller.on('message', async(bot, message) => {
        await bot.reply(message, `Echo: ${ message.text }`);
    });

}