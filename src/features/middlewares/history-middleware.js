/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */

const Message = require('@model/kbase/Message.model')
const { config } = require('@config')

module.exports = function (controller) {

    controller.middleware.receive.use(function (bot, message, next) {
        if (message.type === 'welcome_back') {
            if (bot.isDialogActive('rfc-dialog-id')) {
                return true;
            } else {
                next();
            }
        } else if (config.analytics) {
            Message.create(new Message({
                user: message.user_profile.id,
                text: message.text,
                type: 'message_received'
            }));
            next();
        } else {
            next();
        }
    });

    controller.middleware.send.use(function (bot, message, next) {
        if (config.analytics && message.type == 'message') {
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