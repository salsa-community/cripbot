/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const path = require('path');



module.exports = scriptTemplate = `

let appkey = "$APP_KEY";
let language = "$APP_CULTURE";

let home = document.getElementById("bot-client-script").getAttribute("bothome");
if (!home) {
  home = "";
}

if(language === "undefined"){
  language = Botkit.browserLanguage({ languageCodeOnly: true })[0];
}

document.getElementsByClassName("header_text")[0].innerHTML = Botkit.title();
let user = { asistente: Botkit.getAsistente('$ASISTENTE', '$EXTENSION'), context: appkey, lang: language };
Botkit.boot(user);
let element = document.getElementById("message_header");
document.getElementById("botkit_client").src = home + "/index.html?contexto=$APP_KEY&color=$CSS_COLOR";
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
