const { menuQuickReplies } = require('@feature/dialogs/util/info-quick-replies');
const { i18n } = require('@util/lang');

var UnknowIntent = require('@model/kbase/UnknowIntent.model');

module.exports = function (controller) {
  controller.on('message', function (bot, message) {
    UnknowIntent.create(new UnknowIntent({ word: message.text, context: 'general' }));
    bot.reply(message, {
      text: i18n('help.unknow-intent', message.user_profile.lang),
      quick_replies: menuQuickReplies(message.user_profile.lang)
    });
  });
}