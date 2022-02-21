/**
 * This middleware is for normalize
 * 
 * @author danimaniARQSOFT
 */
const {Normalizacion} = require('@util/text');

module.exports = function (controller) {
    console.log('NORMALIZE-MIDDLEWARE----------')
    controller.middleware.ingest.use(async function (bot, message, next) {
        if (message.type == 'message') {
            message.text = Normalizacion(message.text) //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            console.log('lo que recibo: ',message.text)
        }
        next()
    });
}
