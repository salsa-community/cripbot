/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */

let Message = require('@model/kbase/Message.model')

module.exports = function (controller) {

    controller.middleware.receive.use(function (bot, message, next) {

        if (message.type == 'welcome_back') {
            if (bot.isDialogActive('rfc-dialog-id')) {
                return true;
            } else {
                next();
            }
        } else {
            Message.create(new Message({
                user: message.user_profile.id,
                text: message.text,
                type: 'message_received'
            }));
            next();
        }
    });

    controller.middleware.send.use(function (bot, message, next) {

        if (message.type == 'message') {
            Message.create(new Message({
                user: bot._config.reference.user.id,
                text: message.text,
                type: 'message',
                quick_replies: message.channelData.quick_replies
            }));
        }
        next();
    });

}