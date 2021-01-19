/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */

let Message = require('../../models/kbase/Message.model')

module.exports = function (controller) {
    controller.middleware.receive.use(function (bot, message, next) {
        if (message.type == 'welcome_back') {
            next();
        } else {
            Message.create(new Message({ user: message.user_profile.id, text: message.text, type: 'message_received' }));
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