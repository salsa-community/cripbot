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

let appkey = "$APP_KEY";

let home = document.getElementById("bot-client-script").getAttribute("bothome");
if (!home) {
  home = "";
}

let user = { asistente: Botkit.getAsistente(), context: appkey };
Botkit.boot(user);
let element = document.getElementById("message_header");
document.getElementById("botkit_client").src = home + "/index.html?color=$CSS_COLOR";
element.onclick = function (event) {
  if (!Botkit.active) {
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
