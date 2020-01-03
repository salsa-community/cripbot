/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */
const { menuQuickReplies } = require('../dialogs/util/info-quick-replies');
const { resolveSaludo } = require('../../util/dialogs');
const { typing } = require('../../util/bot.typing');

module.exports = function (controller) {
    controller.interrupts(['hola','buenos dias','saludos'], 'message', async (bot, message) => {
        await typing(bot, message, {
            text: resolveSaludo() + ' posiblemente te pueda ayudar con alguno de los siguientes temas:',
            quick_replies: menuQuickReplies
        });
        await bot.cancelAllDialogs();
    });

    controller.interrupts('cancelar', 'message', async (bot, message) =>{
        await typing(bot, message, {
            text: 'muy bien, comencemos nuevamente',
            quick_replies: menuQuickReplies
        });
        await bot.cancelAllDialogs();
    });
}