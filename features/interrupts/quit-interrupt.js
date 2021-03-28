/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */
const { menuQuickReplies } = require('@feature/dialogs/util/info-quick-replies');
const { resolveSaludo } = require('@util/dialogs');
const { typing } = require('@util/bot.typing');
const { i18n } = require('@util/lang');

module.exports = function (controller) {
    controller.interrupts(['hola', 'buenos dias', 'saludos'], 'message', async (bot, message) => {
        await typing(bot, message, {
            text: resolveSaludo() + ' posiblemente te pueda ayudar con alguno de los siguientes temas:',
            quick_replies: menuQuickReplies(message.user_profile.lang)
        });
        await bot.cancelAllDialogs();
    });

    controller.interrupts('cancelar', 'message', async (bot, message) => {
        await typing(bot, message, {
            text: i18n('general.begin', message.user_profile.lang),
            quick_replies: menuQuickReplies(message.user_profile.lang)
        });
        await bot.cancelAllDialogs();
    });
}