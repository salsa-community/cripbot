/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');



module.exports = scriptTemplate = `
/**
 * Init configuration 
 * for the bot $APP_KEY
 * 
 */

let appKey = "$APP_KEY";

let home = document.getElementById("bot-client-script").getAttribute("bothome");
if (!home) {
  home = "";
}

let options = { id: appKey, asistente: Botkit.getAsistente() };
Botkit.boot(options);
Botkit.deactivate();
let isActivated = false;
let element = document.getElementById("message_header");
element.onclick = function (event) {
  if (!isActivated) {
    document.getElementById("botkit_client").src = home + "/index.html?contexto=$APP_KEY&color=$CSS_COLOR";
    setTimeout(
      function () {
        Botkit.activate();
      }, 100);
    isActivated = true;
  } else {
    isActivated = false;
    Botkit.deactivate();
  }
}

`
