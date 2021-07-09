/**
 * This middleware is for normalize
 * 
 * @author danimaniARQSOFT
 */

module.exports = function (controller) {
    controller.middleware.ingest.use(async function (bot, message, next) {
        if (message.type == 'message') {
            message.text = message.text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        }
        next()
    });
}