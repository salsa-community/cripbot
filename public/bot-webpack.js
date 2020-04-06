/**
 * Initi configuration 
 * for the bot
 * 
 */

var options = {id:'PacWeb'};
Botkit.boot(options);
Botkit.deactivate();
setTimeout(
  function () {
    Botkit.activate();
  }, 600);