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
    convo.addAction('get-rfc-thread');
    convo.addQuestion(RFC_ASK, async (res, convo, bot) => {
        var usuario = await Usuario.findOne({ rfc: res });//SAMI760605RH6
        if (true) {
            //bot.say({ text: 'Bienvenido(a) ' + usuario.nombre + ' ' + usuario.primerApellido + ' ' + usuario.segundoApellido + ' ' });
            await convo.gotoThread('codigo-error-thread');
        } else {
            bot.say({ text: 'el RFC que me proporcionó no se encuentra en nuestra lista de clientes' });
            await convo.gotoThread('get-rfc-thread');
        }
    }, 'rfc', 'get-rfc-thread');

    convo.addAction('codigo-error-thread');
    convo.addQuestion('Por favor, ingrese el código de error', async (res, convo, bot) => {
        var error = await Error.findOne({ clave: res });
        if (error) {
            bot.say({ text: error.desc });
            convo.setVar('error', error);
            convo.setVar('currentStep', error.instrucciones[0]);
            convo.setVar('currentStepIdx', 0);
            convo.setVar('maxStepIdx', error.instrucciones.length);
            await convo.gotoThread('show-steps-thread');
        } else {
            bot.say({ text: 'el código de error ingresado no se encuentra en nuestra base de conocimiento' });
            await convo.gotoThread('codigo-error-thread');
        }
    }, 'codigo-error', 'codigo-error-thread');

    convo.addAction('show-steps-thread');
    convo.addQuestion('Paso {{vars.currentStep.paso}} : {{vars.currentStep.desc}}', async (res, convo, bot) => {
        if (convo.vars.currentStepIdx < convo.vars.maxStepIdx - 1) {
            convo.vars.currentStep = convo.vars.error.instrucciones[++convo.vars.currentStepIdx];
            await convo.gotoThread('show-steps-thread');
        }else{
            bot.say({ text: 'Te puedo ayudar en otros' });
            await convo.gotoThread('codigo-error-thread');
        }
    }, 'ok', 'show-steps-thread');

    controller.addDialog(convo);
    controller.hears('red-cofidi', 'message', async (bot, message) => {
        await bot.beginDialog(RFC_DIALOG_ID);
    });
}