/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = scriptTemplate = `

function renderChatbot() {
    let home = document.getElementById("bot-client-script").getAttribute("bothome");
    home = home ? home : "";

    let iframe = document.getElementById("botkit_client");
    iframe.src = home + "/index.html?contexto=$APP_KEY&color=$CSS_COLOR";
    iframe.onload = () => {
      Botkit.activate();
    }
}

let appkey = "$APP_KEY";
let language = "$APP_CULTURE";

if(language === "undefined"){
  language = Botkit.browserLanguage({ languageCodeOnly: true })[0];
}

document.getElementsByClassName("header_text")[0].innerHTML = Botkit.title();
let user = { asistente: Botkit.getAsistente('$AVATAR', '$EXTENSION'), context: appkey, lang: language };
Botkit.boot(user);

if(Botkit.isActivated()){
  renderChatbot();
}

document.getElementById("message_header").onclick = function (event) {
  if (!Botkit.active) {
    if(!Botkit.booted){
      renderChatbot();
    }else {
      Botkit.activate();
    }
  } else {
    Botkit.deactivate();
  }
}

`
