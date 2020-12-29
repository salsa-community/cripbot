/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');

const embedCssTemplate = require('../files-templates/css-template.js');
const stylesCssTemplate = require('../files-templates/css-template.js');

module.exports = function (controller) {
    var basepath = process.env.CONTEXT ? '/' + process.env.CONTEXT : '/'
    controller.webserver.get('/bot/css/:css(*.css)', (req, res) => {
        res.setHeader('content-type', 'text/css');
        let appKey = req.params.css.split('.')[0];
        let script = cssTemplate.replace(/\$APP_KEY/gi, appKey);
        res.send('ejemplos muiy uenos');
    });
}
