/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');

let Message = require('@model/kbase/Message.model')

module.exports = function (controller) {

    controller.webserver.post('/botkit/history', async (req, res) => {
        res.setHeader('content-type', 'application/json');
        let mensajes = await Message.find({ user: req.body.user }).limit(50).sort({ fecha: 'desc' });
        history = {
            success: mensajes.length > 0,
            history: mensajes,
        };
        res.send(history);
    });
}
