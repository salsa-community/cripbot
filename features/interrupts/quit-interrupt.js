/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */
module.exports = function (controller) {
    controller.interrupts('iniciar', 'message', async (bot, message) => {
        await bot.reply(message, 'Muy bien, en que te puedo ayudar');
        await bot.cancelAllDialogs();
    });
}