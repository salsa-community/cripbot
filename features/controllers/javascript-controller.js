/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');

const scriptTemplate = require('../files-templates/script-template.js');

module.exports = function (controller) {
    var basepath = process.env.CONTEXT ? '/' + process.env.CONTEXT : '/'
    controller.webserver.get('/bot/scripts/:script(*.js)', (req, res) => {
        res.setHeader('content-type', 'application/javascript');
        let appKey = req.params.script.split('.')[0];
        let script = scriptTemplate.replace(/\$APP_KEY/gi, appKey);
        res.send(script);
    });
}
