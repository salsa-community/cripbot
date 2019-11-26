/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */
const { infoQuickReplies } = require('../dialogs/util/info-quick-replies');

module.exports = function (controller) {
    controller.interrupts('cancelar', 'message', async (bot, message) => {
        await bot.reply(message, {
            text: 'Muy bien, posiblemente te pueda ayduar con alguno de los siguientes temas:',
            quick_replies: infoQuickReplies
        });
        await bot.cancelAllDialogs();
    });
}