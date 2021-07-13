/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { i18n } = require('@util/lang');

const { GET_NAME_DIALOG_ID } = require('@feature/dialogs/util/constants')
const { BotkitConversation } = require('botkit')
const { hello, welcomeBack } = require('@feature/dialogs/util/chat-commons');

module.exports = function (controller) {
    let convo = new BotkitConversation(GET_NAME_DIALOG_ID, controller);

    convo.addAction('get-name-thread');
    convo.addQuestion('{{vars.getnombre}}', async (response, convo, bot) => {
        convo.setVar('nombre', response);
        await convo.gotoThread('confirm-name-thread');
    }, 'get-name', 'get-name-thread');



    /**
     * CONFIRM USER NAME THREAD
    */
    convo.addAction('confirm-name-thread');
    convo.addQuestion({
        text: '{{vars.confirmnombre}} <b>{{vars.nombre}}</b>?',
        quick_replies: [{ title: '{{vars.yes}}', payload: '{{vars.yes}}' }, { title: '{{vars.no}}', payload: '{{vars.no}}' }]
    }, async (res, convo, bot) => {
        if (res == convo.vars.yes) {
            await convo.gotoThread('exit-thread');
        } else {
            await convo.gotoThread('get-name-thread');
        }
    }, 'confirm', 'confirm-name-thread');

    convo.addAction('exit-thread');
    convo.addMessage('{{vars.outnombre }} <b>{{vars.nombre}}</b>', 'exit-thread');

    convo.before('default', async (convo, bot) => {
        convo.setVar('getnombre', i18n('dialogs.userinfo.getnombre', convo.vars.lang));
        convo.setVar('confirmnombre', i18n('dialogs.userinfo.confirmnombre', convo.vars.lang));
        convo.setVar('outnombre', i18n('dialogs.userinfo.outnombre', convo.vars.lang));
        convo.setVar('yes', i18n('general.yes', convo.vars.lang));
        convo.setVar('no', i18n('general.no', convo.vars.lang));
    });

    convo.after(async (results, bot) => {
        bot.say({ type: 'update-username', text: results.nombre });
    });

    controller.addDialog(convo);
}