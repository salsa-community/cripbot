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
            await convo.gotoThread('ticket-thread');
        } else {
            bot.say({ text: 'el RFC que me proporcionó no se encuentra en nuestra lista de clientes' });
            await convo.gotoThread('rfc-thread');
        }
    }, 'rfc', 'rfc-thread');

    convo.addAction('ticket-thread');
    convo.addQuestion('Por favor, ingrese el número de ticket', async (res, convo, bot) => {
        if (res === 'cfdi-123') {
            bot.say({ text: 'El problema es que en su factura no se está colocando el Uso de CFDI, para corregirlo debe de realizar el siguiente proceso:' });
            bot.say({ text: 'Ingresar a su factura y presione la opción de modificar' });
            bot.say({ text: 'Buscar la opción de “Uso de CFDI”' });
            bot.say({ text: 'Posterior dar clic en la lupa a lado de este campo, y seleccionar el tipo de uso de CFDI de acuerdo a la lista desplegable y dar “aceptar”' });
            bot.say({ text: 'Finalmente dar clic en “Actualizar” y volver a autorizar.' });
        } else {
            bot.say({ text: 'el ticket ingresado no se encuentra en nuestra base de conocimiento' });
            await convo.gotoThread('ticket-thread');
        }
    }, 'ticket', 'ticket-thread');


    controller.addDialog(convo);
    controller.hears('red-cofidi', 'message', async (bot, message) => {
        await bot.beginDialog(RFC_DIALOG_ID);
    });
}