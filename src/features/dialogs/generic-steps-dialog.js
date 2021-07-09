/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// const { Usuario } = require('@model/vtiger')
const UserService = require('@service/user/user.service')
const ErrorService = require('@service/error/error.service')
var Contacto = require('@model/kbase/Contacto.model')
var Actividad = require('@model/kbase/Actividad.model')
const { normalize, resolveDescProp, resolveProp } = require('@util/commons');
const { i18n } = require('@util/lang');

const { GENERIC_STEP_DIALOG_ID } = require('@feature/dialogs/util/constants')
const { BotkitConversation } = require('botkit')
const { resolveOptions, resolvePageNumber } = require('@util/commons')
const { config } = require('@config');
const UnknowIntent = require('@model/kbase/UnknowIntent.model');

const ContextService = require('@service/context/context.service')

const TYPING_DELAY = config.bot.app.typingdelay;

module.exports = function (controller) {
    let convo = new BotkitConversation(GENERIC_STEP_DIALOG_ID, controller);

    convo.addAction('get-steps-thread')
    convo.addMessage({ type: 'typing', action: 'codigo-error-thread' }, 'get-steps-thread');

    /**
     * CODIGO ERROR THREAD
     */
    convo.addAction('codigo-error-thread')
    convo.addQuestion({
        text: '{{vars.welcomeMessage}}',
        quick_replies: async (template, vars) => {
            vars.optionPage = resolvePageNumber(vars.optionPage);
            let errorPage = await ErrorService.findByGeneral(vars.context, vars.optionPage);
            vars.optionPage = (errorPage && errorPage.length < 3) ? -1 : vars.optionPage;
            return resolveOptions(errorPage, vars.lang)
        }
    }, async (res, convo, bot) => {
        if (res == config.bot.app.nextlabel) {

            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('codigo-error-thread');

        } else {
            let error = await ErrorService.findByClaveAndContext(convo.vars.intent, convo.vars.context);

            if (error) {
                if (config.analytics) {
                    Actividad.create(new Actividad({ contexto: convo.vars.context, valor: error.clave, desc: error.clave, evento: 'CODIGO_ERROR' }));
                }
                bot.say({
                    text: i18n('dialogs.rfc.insert-answer', convo.vars.lang)
                });

                error.instrucciones.pasos[0][convo.vars.descProp] = normalize(error.instrucciones.pasos[0][convo.vars.descProp]);
                convo.setVar('errordesc', error[convo.vars.descProp]);
                convo.setVar('instruccionesdesc', error.instrucciones[convo.vars.descProp]);
                convo.setVar('error', error);
                convo.setVar('currentStep', error.instrucciones.pasos[0]);
                convo.vars.currentStep.desc = normalize(convo.vars.currentStep[convo.vars.descProp]);
                convo.setVar('currentStepIdx', 0);
                convo.setVar('maxStepIdx', error.instrucciones.pasos.length);
                bot.say({ type: 'typing' }, 'typing');
                //await convo.gotoThread('show-steps-thread');
                await convo.gotoThread('show-error-desc');
            } else {
                bot.say({ text: i18n('dialogs.errorcode.notfound', convo.vars.lang) });
                res = res ? res : 'empty-word';
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
    convo.addMessage('{{vars.errorcode_stepdesc}}', 'show-mensaje-realizado');
    convo.addMessage({ type: 'typing', action: 'show-steps-thread' }, 'show-mensaje-realizado');

    /**
     * SHOW STEPS THREAD
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
            await convo.gotoThread('more-info-thread');
        }
    }, 'step-answer', 'show-steps-thread');

    /**
     * ASK for more information
     */
    convo.addAction('more-info-thread');
    convo.addQuestion({
        text: '{{vars.errorcode_finished}}',
        quick_replies: [{ title: 'No', payload: 'no' }, { title: 'Si', payload: 'si' }]
    }, [{
        pattern: 'no',
        handler: async (response, convo, bot) => {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('get-customer-feedback-thread');
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
     * Get customer feedback
     */
    convo.addAction('get-customer-feedback-thread');
    convo.addQuestion({
        text: '{{vars.errorcode_feedback}}',
        quick_replies: [{ title: '<i class= "fa fa-star" aria-hidden="true"><i class= "fa fa-star" aria-hidden="true"><i class= "fa fa-star" aria-hidden="true"></i><i class= "fa fa-star" aria-hidden="true"></i><i class= "fa fa-star" aria-hidden="true"></i>', payload: 'BUENO' }, { title: '<i class= "fa fa-star" aria-hidden="true"><i class= "fa fa-star" aria-hidden="true"></i><i class= "fa fa-star" aria-hidden="true"></i>', payload: 'REGULAR' }, { title: '<i class= "fa fa-star" aria-hidden="true"></i>', payload: 'MALO' }]
    }, [{
        pattern: 'BUENO|REGULAR|MALO',
        handler: async (response, convo, bot) => {
            if (config.analytics) {
                Actividad.create(new Actividad({ contexto: convo.vars.context, valor: response, desc: response, evento: 'REGISTRAR_ENCUESTA' }));
            }
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('exit-thread');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('get-customer-feedback-thread');
        }
    }], 'get-customer-feedback-answer', 'get-customer-feedback-thread');



    /**
     * Ask information to the user
     */
    convo.addAction('ask-user-info-thread');
    convo.addQuestion({
        text: '{{vars.userinfo_getdata}}',
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
        text: '{{vars.userinfo_getemail}}'
    }, [{
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        handler: async (response, convo, bot) => {
            convo.setVar('correo', response);
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('get-asunto');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            bot.say({ text: '{{vars.userinfo_getemail_invalid}}' });
            await convo.gotoThread('get-user-email');
        }
    }], 'get-user-email', 'get-user-email');


    convo.addAction('get-asunto');
    convo.addQuestion({
        text: '{{vars.userinfo_contact_reason}}'
    }, [{
        handler: async (response, convo, bot) => {
            Contacto.create(new Contacto({ correo: convo.vars.correo, context: convo.vars.context, rfc: convo.vars.username, estado: 'NUEVO', desc: response }));
            if (config.analytics) {
                Actividad.create(new Actividad({ contexto: convo.vars.context, valor: convo.vars.correo, desc: response, evento: 'REGISTRAR_CONTACTO' }));
            }
            bot.say({ text: '{{vars.userinfo_contact_answer}}' });
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('exit-thread');
        }
    }], 'get-asunto', 'get-asunto');


    /**
     * Exit Thread
     */
    convo.addAction('exit-thread');
    convo.addMessage('{{vars.userinfo_contact_be_here}}', 'exit-thread');

    /**
     * Init common variables into the Dialog
     */
    convo.before('default', async (convo, bot) => {
        let context = await ContextService.getContext(convo.vars.context);
        convo.setVar('descProp', resolveDescProp(convo.vars.lang));
        convo.setVar('welcomeMessage', i18n('welcome.dialog', convo.vars.lang));
        convo.setVar('rfc_insert', i18n('dialogs.rfc.insert', convo.vars.lang));
        convo.setVar('rfc_insert_answer', i18n('dialogs.rfc.insert-answer', convo.vars.lang));
        convo.setVar('done', i18n('general.done', convo.vars.lang));
        convo.setVar('cancel', i18n('general.cancel', convo.vars.lang));
        convo.setVar('step_text', i18n('general.step', convo.vars.lang));
        convo.setVar('errorcode_finished', i18n('dialogs.errorcode.finished', convo.vars.lang));
        convo.setVar('errorcode_feedback', i18n('dialogs.errorcode.feedback', convo.vars.lang));
        convo.setVar('errorcode_stepdesc', i18n('dialogs.errorcode.stepdesc', convo.vars.lang));
        convo.setVar('userinfo_getdata', i18n('dialogs.userinfo.getdata', convo.vars.lang));
        convo.setVar('userinfo_getemail', i18n('dialogs.userinfo.getemail', convo.vars.lang));
        convo.setVar('userinfo_getemail_invalid', i18n('dialogs.userinfo.getemail-invalid', convo.vars.lang));
        convo.setVar('userinfo_contact_reason', i18n('dialogs.userinfo.reason', convo.vars.lang));
        convo.setVar('userinfo_contact_answer', i18n('dialogs.userinfo.answer', convo.vars.lang));
        convo.setVar('userinfo_contact_be_here', i18n('dialogs.userinfo.behere', convo.vars.lang));
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