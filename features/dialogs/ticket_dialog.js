/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { BotkitConversation } = require('botkit');
let DIALOG_TICKET_ID = 'dialog_ticket_id';
module.exports = function (controller) {
    let convo = new BotkitConversation(DIALOG_TICKET_ID, controller);
    convo.say("vamos a consultar tu información.");
    controller.addDialog(convo);
}
