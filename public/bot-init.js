/**
 * Initi configuration 
 * for the bot
 * 
 */

var options = {};
Botkit.boot(options);
Botkit.deactivate();
setTimeout(
  function () {
    Botkit.activate();
  }, 600);