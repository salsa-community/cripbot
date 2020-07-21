/**
 * Initi configuration
 * for the bot
 *
 */

let appKey = "PacWeb";

let options = { id: appKey, asistente: Botkit.getAsistente() };
Botkit.boot(options);
Botkit.deactivate();
setTimeout(
  function () {
    document.getElementById("botkit_client").src = "/index.html";
    Botkit.activate();
  }, 600);