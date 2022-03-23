/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */
const { MY_STEP_DIALOG_ID } = require('@feature/dialogs/util/constants')
const { menuQuickReplies } = require('@feature/dialogs/util/info-quick-replies');
const { resolveSaludo } = require('@util/dialogs');
const { typing } = require('@util/bot.typing');
const { i18n } = require('@util/lang');

let cancelEn = i18n('general.cancel', 'en');
let cancelEs = i18n('general.cancel', 'es');

module.exports = function (controller) {
    //-----------------------------------------------------------------------------------
    controller.interrupts(['skynet'], 'message', async (bot, message) => {
        await bot.beginDialog(MY_STEP_DIALOG_ID, message.user_profile);
    });
    //-----------------------------------------------------------------------------------
    controller.interrupts(['hola', 'buenos dias', 'saludos'], 'message', async (bot, message) => {
        await typing(bot, message, {
            text: resolveSaludo() + ' posiblemente te pueda ayudar con alguno de los siguientes temas:',
            quick_replies: menuQuickReplies(message.user_profile.lang)
        });
        await bot.cancelAllDialogs();
    });

    controller.interrupts([cancelEn, cancelEs], 'message', async (bot, message) => {
        await typing(bot, message, {
            text: i18n('general.begin', message.user_profile.lang),
            quick_replies: menuQuickReplies(message.user_profile.lang)
        });
        await bot.cancelAllDialogs();
    });
}