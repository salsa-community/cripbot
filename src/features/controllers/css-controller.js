/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { resolveColor, resolveAvatar, resolveFontSize } = require('@util/request-util');
const embedCssTemplate = require('@feature/templates/embed-css-template.js');
const stylesCssTemplate = require('@feature/templates/styles-css-template.js');

module.exports = function (controller) {

    controller.webserver.get('/:context/css/embed.css', (req, res) => {
        let avatar = resolveAvatar(req);
        res.setHeader('content-type', 'text/css');
        let css = embedCssTemplate
            .replace(/\$CSS_COLOR/gi, resolveColor(req))
            .replace(/\$AVATAR_WIDTH/gi, avatar.width)
            .replace(/\$AVATAR_LEFT/gi, avatar.left)
            .replace(/\$AVATAR_TOP/gi, avatar.top);
        res.send(css);
    });

    controller.webserver.get('/:context/css/styles.css', (req, res) => {
        res.setHeader('content-type', 'text/css');
        let script = stylesCssTemplate
            .replace(/\$CSS_COLOR/gi, resolveColor(req))
            .replace(/\$FONT_SIZE/gi, resolveFontSize(req));
        res.send(script);
    });
}
