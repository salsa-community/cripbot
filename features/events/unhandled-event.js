const { menuQuickReplies } = require('../dialogs/util/info-quick-replies');

module.exports = function (controller) {
  controller.on('message', function (bot, message) {
    bot.reply(message, {
      text: 'Lo siento, No entiendo lo que me solicitas, pero te puedo apoyar con alguno de lo siguientes temas',
      quick_replies: menuQuickReplies
    });
  });
}