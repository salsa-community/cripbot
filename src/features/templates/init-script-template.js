/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = scriptTemplate = `

function renderChatbot(home) {
    Botkit.showOverlay();
    let iframe = document.getElementById("botkit_client");
    iframe.src = home + "/index.html?contexto=$APP_KEY&color=$CSS_COLOR";
    
    Botkit.activate();
    iframe.onload = () => {
      Botkit.hideOverlay();
      Botkit.scrollBotton();
    }
}

let appkey = "$APP_KEY";
let language = "$APP_CULTURE";

let home = document.getElementById("bot-client-script").getAttribute("bothome");
home = home ? home : "";

if(language === "undefined"){
  language = Botkit.browserLanguage({ languageCodeOnly: true })[0];
}

document.getElementsByClassName("header_text")[0].innerHTML = Botkit.title();
let extension = '$EXTENSION';
extension = typeof extension === 'undefined' ? 'png' : extension;
let asistente = Botkit.getAsistente('$AVATAR');
let avatar = asistente.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + "." + extension;
document.getElementById("avatar-bot").src = home + "/images/avatares/" + avatar;

let user = { asistente: asistente, context: appkey, lang: language, bothome: home };
Botkit.boot(user);

if(Botkit.isActivated()){
  renderChatbot(home);
}

document.getElementById("message_header").onclick = function (event) {
  if (!Botkit.active) {
    if(!Botkit.booted){
      renderChatbot(home);
    }else {
      Botkit.activate();
    }
  } else {
    Botkit.deactivate();
  }
}

`
