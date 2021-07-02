const { menuQuickReplies } = require('@feature/dialogs/util/info-quick-replies');
const { i18n } = require('@util/lang');

var UnknowIntent = require('@model/kbase/UnknowIntent.model');

module.exports = function (controller) {
  controller.on('message,direct_message', async (bot, message) => {

    let matchedMessage = false;

    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
      matchedMessage = await controller.plugins.cms.testTrigger(bot, message);
    }

    if (matchedMessage == false) {
      UnknowIntent.create(new UnknowIntent({ word: message.text, context: 'general' }));
      console.log('consultar info' + message.user_profile.lang);
      console.log(i18n('help.unknow-intent', message.user_profile.lang));
      bot.reply(message, {
        text: i18n('help.unknow-intent', message.user_profile.lang),
        quick_replies: menuQuickReplies(message.user_profile.lang)
      });
    }
  });
}