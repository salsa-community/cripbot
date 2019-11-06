/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 * https://www.terlici.com/2015/04/03/mongodb-node-express.html
 */
var MongoClient = require('mongodb').MongoClient

const { Botkit, BotkitConversation } = require('botkit');
let DIALOG_TICKET_ID = 'dialog_ticket_id';
module.exports = function (controller) {
    let convo = new BotkitConversation(DIALOG_TICKET_ID, controller);
    convo.ask('ingresa tu rfc', async (answer) => {
    }, { key: 'rfc' });
    controller.addDialog(convo);
}
