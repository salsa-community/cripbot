/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */
const { menuQuickReplies } = require('../dialogs/util/info-quick-replies');
const { resolveSaludo } = require('../../util/dialogs');

module.exports = function (controller) {
    controller.interrupts(['hola','buenos dias','saludos'], 'message', async (bot, message) => {
        await bot.reply(message, {
            text: resolveSaludo() + ' posiblemente te pueda ayduar con alguno de los siguientes temas:',
            quick_replies: menuQuickReplies
        });
        await bot.cancelAllDialogs();
    });
    controller.interrupts('cancelar', 'message', async (bot, message) => {
        await bot.reply(message, {
            text: 'Muy bien, posiblemente te pueda ayduar con alguno de los siguientes temas:',
            quick_replies: menuQuickReplies
        });
        await bot.cancelAllDialogs();
    });
}