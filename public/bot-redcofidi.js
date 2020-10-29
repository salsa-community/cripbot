/**
 * Initi configuration 
 * for the bot
 * 
 */

let appKey = "RedCofidi";

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
    document.getElementById("botkit_client").src = home + "/index.html";
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
