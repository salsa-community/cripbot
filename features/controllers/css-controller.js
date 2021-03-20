/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');
const { resolveColor } = require('@util/request-util');


const embedCssTemplate = require('../templates/embed-css-template.js');
const stylesCssTemplate = require('../templates/styles-css-template.js');

module.exports = function (controller) {

    controller.webserver.get('/:context/css/embed.css', (req, res) => {
        res.setHeader('content-type', 'text/css');
        let css = embedCssTemplate.replace(/\$CSS_COLOR/gi, resolveColor(req));
        res.send(css);
    });

    controller.webserver.get('/:context/css/styles.css', (req, res) => {
        res.setHeader('content-type', 'text/css');
        let script = stylesCssTemplate.replace(/\$CSS_COLOR/gi, resolveColor(req));
        res.send(script);
    });
}
