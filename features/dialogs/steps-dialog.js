/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { Usuario } = require('../../models/vtiger')
var Error = require('../../models/kbase/Error.model')
var Contacto = require('../../models/kbase/Contacto.model')

const { RFC_DIALOG_ID, BOT_CLIENT_PAC_WEB__ID, BOT_CLIENT_RED_COFIDI__ID } = require('./util/constants')
const { BotkitConversation } = require('botkit')
const { resolveCodigo, resolveOptions, resolvePageNumber } = require('../../util/commons')
const { TYPING_DELAY, PAGINATOR_NEXT_LABEL } = require('../../config');
const UnknowIntent = require('../../models/kbase/UnknowIntent.model');

module.exports = function (controller) {
    let convo = new BotkitConversation(RFC_DIALOG_ID, controller);

    /**
     * GET RFC THREAD
     */
    convo.addAction('get-rfc-thread')
    convo.addQuestion('{{vars.rfc_ask}}', async (res, convo, bot) => {
        var usuario = await Usuario.findOne({ where: { siccode: res.trim() }, attributes: ['siccode', 'accountname'] });
        if (usuario) {
            var subject = convo.vars.user === BOT_CLIENT_RED_COFIDI__ID ? 'proveedor' : 'usuario';
            bot.say({ text: 'Bienvenido ' + subject + ' de ' + usuario.accountname })
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('codigo-error-thread')
        } else {
            bot.say({ text: 'el RFC que me proporcionó no se encuentra en nuestra lista de clientes' })
            await convo.gotoThread('ask-user-info-thread')
        }
    }, 'rfc', 'get-rfc-thread')

    /**
     * CODIGO ERROR THREAD
     */
    convo.addAction('codigo-error-thread')
    convo.addQuestion({
        text: '<b>Ingrese, por favor, el código de error que le presenta el sistema. También puede seleccionar alguno de los siguientes temas:</b>',
        quick_replies: async (template, vars) => {
            vars.optionPage = resolvePageNumber(vars.optionPage);
            var errorPage = await Error.find({ contextos: { $in: [vars.user] }, tipo: 'general' }).skip(vars.optionPage).limit(3).sort({ orden: 'asc' });
            vars.optionPage = (errorPage && errorPage.length < 3) ? -1 : vars.optionPage;
            return resolveOptions(errorPage)
        }
    }, async (res, convo, bot) => {
        if (res == PAGINATOR_NEXT_LABEL) {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('codigo-error-thread');
        } else {
            var error = await Error.findOne({ clave: resolveCodigo(res), contextos: { $in: [convo.vars.user] } });
            if (error) {
                bot.say({
                    text: 'Gracias por su respuesta. A continuación le voy a presentar la información relacionada con su petición.'
                });
                convo.setVar('errordesc', error.desc);
                convo.setVar('instruccionesdesc', error.instrucciones.desc);
                convo.setVar('error', error);
                convo.setVar('currentStep', error.instrucciones.pasos[0]);
                convo.setVar('currentStepIdx', 0);
                convo.setVar('maxStepIdx', error.instrucciones.pasos.length);
                bot.say({ type: 'typing' }, 'typing');
                //await convo.gotoThread('show-steps-thread');
                await convo.gotoThread('show-error-desc');
            } else {
                bot.say({ text: 'el código de error ingresado no se encuentra en nuestra base de conocimiento' });
                UnknowIntent.create(new UnknowIntent({ word: res, context: 'codigo-error-dialog' }));
                await convo.gotoThread('codigo-error-thread');
            }
        }
    }, 'codigo-error', 'codigo-error-thread');

    /**
     * SHOW Error DESC
     */
    convo.addAction('show-error-desc');
    convo.addMessage('{{vars.errordesc}}', 'show-error-desc');
    convo.addMessage({ type: 'typing', action: 'show-error-instrucciones-desc' }, 'show-error-desc');

    /**
     * SHOW Error Instrucciones consultados
     */

    convo.addAction('show-error-instrucciones-desc');
    convo.addMessage('{{vars.instruccionesdesc}}', 'show-error-instrucciones-desc');
    convo.addMessage({ type: 'typing', action: 'show-mensaje-realizado' }, 'show-error-instrucciones-desc');

    convo.addAction('show-mensaje-realizado');
    convo.addMessage('Le voy a describir los pasos a seguir para solucionar su incidente. Por favor, cuando concluya el paso, presione el botón de realizado', 'show-mensaje-realizado');
    convo.addMessage({ type: 'typing', action: 'show-steps-thread' }, 'show-mensaje-realizado');

    /**
     * SHOW STEPS THREAD
     */
    convo.addAction('show-steps-thread');
    convo.addQuestion({
        text: '<b>Paso {{vars.currentStep.paso}} :</b> {{vars.currentStep.desc}}',
        quick_replies: [{ title: 'Realizado', payload: 'Realizado' }]
    }, async (res, convo, bot) => {
        if (convo.vars.currentStepIdx < convo.vars.maxStepIdx - 1) {
            convo.vars.currentStep = convo.vars.error.instrucciones.pasos[++convo.vars.currentStepIdx];
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('show-steps-thread');
        } else {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('more-info-thread');
        }
    }, 'step-answer', 'show-steps-thread');

    /**
     * ASK for more information
     */
    convo.addAction('more-info-thread');
    convo.addQuestion({
        text: 'A concluido los pasos para resolver su incidente ¿Requiere alguna ayuda adicional?',
        quick_replies: [{ title: 'No', payload: 'no' }, { title: 'Si', payload: 'si' }]
    }, [{
        pattern: 'no',
        handler: async (response, convo, bot) => {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('exit-thread');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('codigo-error-thread');
        }
    }], 'more-info-answer', 'more-info-thread');

    /**
     * Ask information to the user
     */
    convo.addAction('ask-user-info-thread');
    convo.addQuestion({
        text: '¿Te gustaría dejarnos tus datos?',
        quick_replies: [{ title: 'No', payload: 'no' }, { title: 'Si', payload: 'si' }]
    }, [{
        pattern: 'no',
        handler: async (response, convo, bot) => {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('exit-thread');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            await convo.gotoThread('get-user-email');
        }
    }], 'ask-user-info-answer', 'ask-user-info-thread');



    convo.addAction('get-user-email');
    convo.addQuestion({
        text: 'Por favor, proporcioname un correo electrónico para contactarte'
    }, [{
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        handler: async (response, convo, bot) => {
            Contacto.create(new Contacto({ correo: response, context: convo.vars.user }));
            bot.say({ text: 'Gracias, en breve te contactaremos' });
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('exit-thread');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            bot.say({ text: 'El correo electrónico que ingresaste, no es un correo válido' });
            await convo.gotoThread('get-user-email');
        }
    }], 'get-user-email', 'get-user-email');

    convo.addAction('exit-thread');
    convo.addMessage('Fue un placer ayudarle, estaré aquí si me requiere', 'exit-thread');

    /**
     * Init common variables into the Dialog
     */
    convo.before('default', async (convo, bot) => {
        convo.setVar('rfc_ask', 'Por favor, ingrese ' + (convo.vars.user === BOT_CLIENT_RED_COFIDI__ID ? 'el RFC del receptor de la factura' : 'su RFC para recibir ayuda'));
    });

    convo.before('show-steps-thread', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });
    convo.before('more-info-thread', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    convo.before('codigo-error-thread', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    convo.before('exit-thread', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    convo.before('show-error-desc', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    convo.before('show-error-instrucciones-desc', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    convo.before('show-mensaje-realizado', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    controller.addDialog(convo);
}