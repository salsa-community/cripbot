/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const ErrorService = require('@service/error/error.service')
var Actividad = require('@model/kbase/Actividad.model')
const { normalize, resolveDescProp } = require('@util/commons');
const { i18n } = require('@util/lang');
const { INTENT_DIALOG_ID } = require('@feature/dialogs/util/constants')
const { BotkitConversation } = require('botkit')
const { config } = require('@config');


const TYPING_DELAY = config.bot.app.typingdelay;

module.exports = function (controller) {
    let convo = new BotkitConversation(INTENT_DIALOG_ID, controller);


    /**
    * INITTHREAD
    */
    convo.addAction('init-thread')
    convo.addQuestion('{{vars.welcome}}', async (res, convo, bot) => {
        let error = await ErrorService.findByClaveAndContext(convo.vars.intent, convo.vars.context);

        if (config.analytics) {
            Actividad.create(new Actividad({ contexto: convo.vars.context, valor: error.clave, desc: error.clave, evento: 'CODIGO_ERROR' }));
        }
        convo.setVar('descProp', resolveDescProp(convo.vars.lang));
        convo.setVar('error', error);
        let maxStepIdx = 0;
        if (error.instrucciones.pasos && error.instrucciones.pasos.length > 0) {
            error.instrucciones.pasos[0][convo.vars.descProp] = normalize(error.instrucciones.pasos[0][convo.vars.descProp]);
            convo.setVar('currentStep', error.instrucciones.pasos[0]);
            convo.vars.currentStep.desc = normalize(convo.vars.currentStep[convo.vars.descProp]);
            maxStepIdx = error.instrucciones.pasos.length;
        }
        convo.setVar('currentStepIdx', 0);
        convo.setVar('maxStepIdx', maxStepIdx);

        for (let index = 0; index < error.mensajes.length; index++) {
            const mensaje = error.mensajes[index];
            bot.say({ text: mensaje.desc });
        }

        if (maxStepIdx > 0) {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('show-steps-thread');
        } else {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('exit-thread');
        }

    }, 'init', 'init-thread')


    /**
     * SHOW MENSAJES THREAD
    */
    convo.addAction('show-steps-thread');
    convo.addQuestion({
        text: '<b>{{vars.step_text}} {{vars.currentStep.paso}} :</b> {{{vars.currentStep.desc}}}',
        quick_replies: [{ title: '{{vars.done}}', payload: '{{vars.done}}' }, { title: '{{vars.cancel}}', payload: '{{vars.cancel}}' }]
    }, async (res, convo, bot) => {
        if (convo.vars.currentStepIdx < convo.vars.maxStepIdx - 1) {
            convo.vars.currentStep = convo.vars.error.instrucciones.pasos[++convo.vars.currentStepIdx];
            convo.vars.currentStep.desc = normalize(convo.vars.currentStep[convo.vars.descProp]);
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('show-steps-thread');
        } else {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('exit-thread');
        }
    }, 'step-answer', 'show-steps-thread');


    /**
    * Exit Thread
    */
    convo.addAction('exit-thread');
    convo.addMessage('{{vars.userinfo_contact_be_here}}', 'exit-thread');
    /**
     * Init common variables into the Dialog
     */
    convo.before('default', async (convo, bot) => {
        convo.setVar('welcome', i18n('dialogs.rfc.insert-answer', convo.vars.lang));
        convo.setVar('done', i18n('general.done', convo.vars.lang));
        convo.setVar('cancel', i18n('general.cancel', convo.vars.lang));
        convo.setVar('step_text', i18n('general.step', convo.vars.lang));
        convo.setVar('errorcode_finished', i18n('dialogs.errorcode.finished', convo.vars.lang));
        convo.setVar('errorcode_feedback', i18n('dialogs.errorcode.feedback', convo.vars.lang));
        convo.setVar('errorcode_stepdesc', i18n('dialogs.errorcode.stepdesc', convo.vars.lang));
        convo.setVar('userinfo_contact_be_here', i18n('dialogs.userinfo.behere', convo.vars.lang));
    });

    convo.before('show-mensajes-thread', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    convo.before('exit-thread', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    controller.addDialog(convo);
}