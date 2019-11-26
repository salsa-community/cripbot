/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { RFC_DIALOG_ID } = require('./util/constants');
var Usuario = require('../../models/Usuario.model');
var Error = require('../../models/Error.model');


const { BotkitConversation } = require('botkit');

let RED_COFIDI_SAY = 'RedCofidi es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas.';
let RFC_ASK = 'Por favor, ingrese el RFC de su empresa o la empresa receptora del CFDI.';

module.exports = function (controller) {
    let convo = new BotkitConversation(RFC_DIALOG_ID, controller);
    convo.addAction('rfc-thread');
    convo.addQuestion(RFC_ASK, async (res, convo, bot) => {
        var usuario = await Usuario.findOne({ rfc: res });
        //SAMI760605RH6
        if (usuario && usuario.rfc) {
            bot.say({ text: 'Bienvenido(a) ' + usuario.nombre + ' ' + usuario.primerApellido + ' ' + usuario.segundoApellido + ' ' });
            await convo.gotoThread('ticket-thread');
        } else {
            bot.say({ text: 'el RFC que me proporcionó no se encuentra en nuestra lista de clientes' });
            await convo.gotoThread('rfc-thread');
        }
    }, 'rfc', 'rfc-thread');

    convo.addAction('ticket-thread');
    convo.addQuestion('Por favor, ingrese el número de ticket', async (res, convo, bot) => {
        var error = await Error.findOne({ clave: res });
        if (error) {
            for (let instruccion of error.instrucciones) {
                bot.say({ text: instruccion.desc });
            }
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