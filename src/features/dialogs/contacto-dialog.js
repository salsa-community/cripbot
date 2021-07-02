/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var Contacto = require('@model/kbase/Contacto.model')
var Actividad = require('@model/kbase/Actividad.model')
const { i18n } = require('@util/lang');

const { CONTACTO_DIALOG_ID } = require('@feature/dialogs/util/constants')
const { BotkitConversation } = require('botkit')
const { config } = require('@config');

const TYPING_DELAY = config.bot.app.typingdelay;

module.exports = function (controller) {
    let convo = new BotkitConversation(CONTACTO_DIALOG_ID, controller);

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
            bot.say({
                text: convo.vars.userinfo_getemail_invalid
            });
            await convo.gotoThread('get-user-email');
        }
    }], 'get-user-email', 'get-user-email');


    convo.addAction('get-asunto');
    convo.addQuestion('{{vars.userinfo_contact_reason}}', [{
        handler: async (response, convo, bot) => {
            Contacto.create(new Contacto({ correo: convo.vars.correo, context: convo.vars.context, rfc: convo.vars.username, estado: 'NUEVO', desc: response }));
            if (config.analytics) {
                Actividad.create(new Actividad({ contexto: convo.vars.context, valor: convo.vars.correo, desc: response, evento: 'REGISTRAR_CONTACTO' }));
            }
            bot.say({ text: convo.vars.userinfo_contact_answer });
            bot.say({ type: 'typing' }, 'typing');
            await convo.gotoThread('exit-thread');
        }
    }], 'get-asunto', 'get-asunto');

    convo.addAction('exit-thread');
    convo.addMessage('{{vars.userinfo_contact_be_here}}', 'exit-thread');
    convo.before('default', async (convo, bot) => {
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

    convo.before('exit-thread', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    controller.addDialog(convo);
}