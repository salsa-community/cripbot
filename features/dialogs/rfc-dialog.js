/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { RFC_DIALOG_ID } = require('./util/constants');
const { TICKET_DIALOG_ID } = require('./util/constants');

const { BotkitConversation } = require('botkit');

let RED_COFIDI_SAY = 'RedCofidi es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas.';
let RFC_ASK = 'Por favor, ingrese el RFC de su empresa o la empresa receptora del CFDI.';

module.exports = function (controller) {
    let convo = new BotkitConversation(RFC_DIALOG_ID, controller);
    convo.say(RED_COFIDI_SAY);
    convo.addAction('rfc-thread');
    convo.addQuestion(RFC_ASK, async (res, convo, bot) => {
        if (res === 'SAMI760605RH6') {
            bot.say({ text: 'Bienvenida Itzia María del Carmen Sánchez Méndez al soporte de RedCofidi' });
            bot.beginDialog(TICKET_DIALOG_ID);
        } else {
            bot.say({ text: 'el RFC que me proporcionó no se encuentra en nuestra lista de clientes' });
            await convo.gotoThread('rfc-thread');
        }
    }, 'rfc', 'rfc-thread');

    controller.addDialog(convo);
    controller.hears('red-cofidi', 'message', async (bot, message) => {
        await bot.beginDialog(RFC_DIALOG_ID);
    });
}