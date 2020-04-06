/**
 * Initi configuration 
 * for the bot
 * 
 */

var options = {id:'RedCofidi'};
Botkit.boot(options);
Botkit.deactivate();
setTimeout(
  function () {
    Botkit.activate();
  }, 600);