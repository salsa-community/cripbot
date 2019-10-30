/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { BotkitConversation } = require('botkit');
let DIALOG_LOGIN_ID = 'dialog_login_id';
let RED_COFIDI_SAY = 'RedCofidi es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas.';
let RFC_ASK = 'Por favor, ingrese el RFC de su empresa o la empresa receptora del CFDI.';
module.exports = function (controller) {
    let convo = new BotkitConversation(DIALOG_LOGIN_ID, controller);
    convo.say(RED_COFIDI_SAY);
    convo.ask(RFC_ASK, async (answer) => {
    }, { key: 'rfc' });
    convo.say('Bienvenida Itzia María del Carmen Sánchez Méndez al soporte de RedCofidi');
    convo.say('¿Cómo puedo ayudarte?');
    controller.addDialog(convo);
    controller.afterDialog(DIALOG_LOGIN_ID, async (bot, results) => {
        await bot.beginDialog('dialog_ticket_id');
    });
    controller.hears('data', 'message', async (bot, message) => {
        await bot.beginDialog(DIALOG_LOGIN_ID);
    });
}