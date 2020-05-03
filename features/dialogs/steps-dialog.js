/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { Usuario } = require('../../models/vtiger')
var Error = require('../../models/kbase/Error.model')
const { RFC_DIALOG_ID, BOT_CLIENT_PAC_WEB__ID, BOT_CLIENT_RED_COFIDI__ID } = require('./util/constants')
const { BotkitConversation } = require('botkit')
const { resolveCodigo, resolveOptions, resolvePageNumber } = require('../../util/commons')
const { TYPING_DELAY, PAGINATOR_NEXT_LABEL } = require('../../config');


const RFC_ASK = 'Por favor, ingrese el RFC del receptor de la factura'

module.exports = function (controller) {
    let convo = new BotkitConversation(RFC_DIALOG_ID, controller);
    /**
     * GET RFC THREAD
     */
    convo.addAction('get-rfc-thread')
    convo.addQuestion(RFC_ASK, async (res, convo, bot) => {
        //console.log(convo.vars.user);
        var usuario = await Usuario.findOne({ where: { siccode: res.trim() }, attributes: ['siccode', 'accountname'] });
        if (usuario) {
            var subject = convo.vars.user === BOT_CLIENT_RED_COFIDI__ID ? 'proveedor' : 'usuario';
            bot.say({ text: 'Bienvenido ' + subject +' de ' + usuario.accountname })
            bot.say({type: 'typing'}, 'typing');
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
        text: '<b>Ingrese el código de error que se está presentando o consulte alguna de nuestras siguientes secciones:</b>',
        quick_replies: async (template, vars) => {
            vars.optionPage = resolvePageNumber(vars.optionPage);
            return resolveOptions(vars.optionPage)
        }
    }, async (res, convo, bot) => {
        if(res == PAGINATOR_NEXT_LABEL){
            bot.say({type: 'typing'}, 'typing');
            await convo.gotoThread('codigo-error-thread');
        }else{
            var error = await Error.findOne({ clave: resolveCodigo(res) });
            if (error) {
                bot.say({ text: error.desc });
                bot.say({ text: error.instrucciones.desc });
                convo.setVar('error', error);
                convo.setVar('currentStep', error.instrucciones.pasos[0]);
                convo.setVar('currentStepIdx', 0);
                convo.setVar('maxStepIdx', error.instrucciones.pasos.length);
                bot.say({type: 'typing'}, 'typing');
                await convo.gotoThread('show-steps-thread');
            } else {
                bot.say({ text: 'el código de error ingresado no se encuentra en nuestra base de conocimiento' });
                await convo.gotoThread('codigo-error-thread');
            }
        }
    }, 'codigo-error', 'codigo-error-thread');

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
            bot.say({type: 'typing'}, 'typing');
            await convo.gotoThread('show-steps-thread');
        } else {
            bot.say({type: 'typing'}, 'typing');
            await convo.gotoThread('more-info-thread');
        }
    }, 'step-answer', 'show-steps-thread');

    /**
     * ASK for more information
     */

    convo.addAction('more-info-thread');
    convo.addQuestion({
        text: '¿Lo podemos ayudar en algo más? ¿Necesita alguna asesoría adicional?',
        quick_replies: [{ title: 'No', payload: 'no' }, { title: 'Si', payload: 'si' }]
    }, [{
        pattern: 'no',
        handler: async (response, convo, bot) => {
            bot.say({type: 'typing'}, 'typing');
            await convo.gotoThread('exit-thread');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            bot.say({type: 'typing'}, 'typing');
            await convo.gotoThread('codigo-error-thread');
        }
    }], 'more-info-answer', 'more-info-thread');

    /**
     * Preguntar por información del usuario
     */

    convo.addAction('ask-user-info-thread');
    convo.addQuestion({
        text: '¿Te gustaría dejarnos tus datos?',
        quick_replies: [{ title: 'No', payload: 'no' }, { title: 'Si', payload: 'si' }]
    }, [{
        pattern: 'no',
        handler: async (response, convo, bot) => {
            bot.say({type: 'typing'}, 'typing');
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
            bot.say({ text: 'Gracias, en breve te contactaremos' });
            bot.say({type: 'typing'}, 'typing');
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


    convo.before('show-steps-thread',  async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });
    convo.before('more-info-thread',  async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    convo.before('codigo-error-thread',  async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });
    
    convo.before('exit-thread',  async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    controller.addDialog(convo);
}