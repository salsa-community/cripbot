/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * https://www.terlici.com/2015/04/03/mongodb-node-express.html
 */
const { TICKET_DIALOG_ID } = require('./util/constants');

const { Botkit, BotkitConversation } = require('botkit');

module.exports = function (controller) {
    let convo = new BotkitConversation(TICKET_DIALOG_ID, controller);
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
}
