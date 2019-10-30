/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { BotkitConversation } = require('botkit');
let DIALOG_LOGIN_ID = 'dialog_login_id';
let RED_COFIDI_SAY = 'RedCofidi es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas.';
let RFC_ASK = 'Por favor, ingrese el RFC de su empresa o la empresa receptora del CFDI.';
module.exports = function (controller) {
    controller.hears(['.*servicios*.'], 'message', async (bot, message) => {
        bot.reply(message, {
            text: 'Tenemos las siguientes opciones:',
            quick_replies: [
                {
                    title: 'Cuenta con un Codigo CFDI',
                    payload: 'codigoCFDI'
                }, {
                    title: 'Seguimiento a un ticket',
                    payload: 'segTicket'
                }, {
                    title: 'Crear un ticket',
                    payload: 'crearTicket'
                }
            ]
        }, function () { });
    });
}