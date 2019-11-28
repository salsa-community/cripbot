/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { RFC_DIALOG_ID } = require('./util/constants');
var Usuario = require('../../models/Usuario.model');
var Error = require('../../models/Error.model');
const { BotkitConversation } = require('botkit');
let RFC_ASK = 'Por favor, ingrese el RFC del receptor de la factura';

module.exports = function (controller) {
    let convo = new BotkitConversation(RFC_DIALOG_ID, controller);
    /**
     * GET RFC THREAD
     */
    convo.addAction('get-rfc-thread');
    convo.addQuestion(RFC_ASK, async (res, convo, bot) => {
        var usuario = await Usuario.findOne({ rfc: res });//SAMI760605RH6
        if (usuario) {
            bot.say({ text: 'Bienvenido(a) ' + usuario.nombre + ' ' + usuario.primerApellido + ' ' + usuario.segundoApellido + ' ' });
            await convo.gotoThread('codigo-error-thread');
        } else {
            bot.say({ text: 'el RFC que me proporcionó no se encuentra en nuestra lista de clientes' });
            await convo.gotoThread('get-rfc-thread');
        }
    }, 'rfc', 'get-rfc-thread');

    /**
     * CODIGO ERROR THREAD
     */
    convo.addAction('codigo-error-thread');
    convo.addQuestion('Ingrese el código de error que se está presentando', async (res, convo, bot) => {
        var error = await Error.findOne({ clave: res });
        if (error) {
            bot.say({ text: error.desc });
            bot.say({ text: error.instrucciones.desc });
            convo.setVar('error', error);
            convo.setVar('currentStep', error.instrucciones.pasos[0]);
            convo.setVar('currentStepIdx', 0);
            convo.setVar('maxStepIdx', error.instrucciones.pasos.length);
            await convo.gotoThread('show-steps-thread');
        } else {
            bot.say({ text: 'el código de error ingresado no se encuentra en nuestra base de conocimiento' });
            await convo.gotoThread('codigo-error-thread');
        }
    }, 'codigo-error', 'codigo-error-thread');

    /**
     * SHOW STEPS THREAD
     */
    convo.addAction('show-steps-thread');
    convo.addQuestion({
        text: 'Paso {{vars.currentStep.paso}} : {{vars.currentStep.desc}}',
        quick_replies: [{ title: 'Realizado', payload: 'Realizado' }]
    }, async (res, convo, bot) => {
        if (convo.vars.currentStepIdx < convo.vars.maxStepIdx - 1) {
            convo.vars.currentStep = convo.vars.error.instrucciones.pasos[++convo.vars.currentStepIdx];
            await convo.gotoThread('show-steps-thread');
        } else {
            await convo.gotoThread('more-info-thread');
        }
    }, 'step-answer', 'show-steps-thread');

    /**
     * ASK for more information
     */

    convo.addAction('more-info-thread');
    convo.addQuestion({
        text: '¿Te gustaría ingresar otro código de error?',
        quick_replies: [{ title: 'No', payload: 'no' }, { title: 'Si', payload: 'si' }]
    }, [{
        pattern: 'no',
        handler: async (response, convo, bot) => {
            await convo.gotoThread('exit-thread');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            await convo.gotoThread('codigo-error-thread');
        }
    }], 'more-info-answer', 'more-info-thread');

    convo.addAction('exit-thread');
    convo.addMessage('Fue un placer ayudarle, estaré aquí si me requiere','exit-thread');
    controller.addDialog(convo);
    controller.hears('red-cofidi', 'message', async (bot, message) => {
        await bot.beginDialog(RFC_DIALOG_ID);
    });
}