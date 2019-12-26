const { menuQuickReplies } = require('../dialogs/util/info-quick-replies');

var UnknowIntent = require('../../models/UnknowIntent.model');

module.exports = function (controller) {
  controller.on('message', function (bot, message) {
    UnknowIntent.create(new UnknowIntent({ word: message.text }));
    bot.reply(message, {
      text: 'Lo siento, No entiendo lo que me solicitas, pero te puedo apoyar con alguno de lo siguientes temas',
      quick_replies: menuQuickReplies
    });
  });
}