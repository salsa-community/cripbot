/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */
const {Intencion} = require('@util/resolveIntent');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const { INTENT_DIALOG_ID } = require('@feature/dialogs/util/constants')
const ErrorService = require('@service/error/error.service')
const { resolveIntent } = require('@util/commons');
const { logger } = require('@config');

module.exports = function (controller) {
    console.log('HEARS-MIDDLEWARE------')
    controller.middleware.receive.use(async function (bot, message, next) {
        logger.debug(`userprofile((${JSON.stringify(message.user_profile)})): `);

        if (message.type == 'message') {
            message.text=Intencion(message.text)//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            message.text=String(message.text)

            let context = message.user_profile.context;
            let flows = await ErrorService.findAllFlows(context);
            let intent = resolveIntent(flows, message.text);
            if (intent) {
                logger.debug(`intent((${intent})): `);
                message.user_profile.intent = intent;
                await bot.cancelAllDialogs();
                await bot.beginDialog(INTENT_DIALOG_ID, message.user_profile);
            } else {
                next()
            }
        } else {
            next()
        }
        //Get context
        //Error.service(context)
        //Iniciar dialogo generico de mensajes
    });


}