/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');
const package = require('@root/package.json');

module.exports = function (controller) {
    var basepath = process.env.CONTEXT ? '/' + process.env.CONTEXT : '/'
    // make public/index.html available as localhost/index.html
    // by making the /public folder a static/public asset
    controller.publicFolder(basepath, path.join(__dirname, '..', 'public'));
    controller.webserver.get('/info', (req, res) => {
        info.host = req.headers.host + basepath;
        res.send(info);
    });
    console.log('Chat with me: http://localhost:' + (process.env.PORT || 3000) + basepath);
}


var info = {
    version: package.version,
}