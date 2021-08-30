/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const scriptTemplate = require('@feature/templates/init-script-template.js');
const { resolveColor, resolveLang, resolveAvatar } = require('@util/request-util');

module.exports = function (controller) {
    controller.webserver.get('/:context/scripts/bot.js', (req, res) => {
        let avatar = resolveAvatar(req);
        res.setHeader('content-type', 'application/javascript');
        let script = scriptTemplate
            .replace(/\$APP_KEY/gi, req.params.context)
            .replace(/\$CSS_COLOR/gi, resolveColor(req))
            .replace(/\$APP_CULTURE/gi, resolveLang(req))
            .replace(/\$AVATAR/gi, avatar.name)
            .replace(/\$EXTENSION/gi, avatar.extension);
        res.send(script);
    });
}
