/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');

const scriptTemplate = require('../templates/script-template.js');
const { resolveColor } = require('../../util/request-util');

module.exports = function (controller) {
    var basepath = process.env.CONTEXT ? '/' + process.env.CONTEXT : '/'
    controller.webserver.get('/:context/scripts/bot.js', (req, res) => {
        res.setHeader('content-type', 'application/javascript');
        let script = scriptTemplate.replace(/\$APP_KEY/gi, req.params.context).replace(/\$CSS_COLOR/gi, resolveColor(req));
        res.send(script);
    });
}
