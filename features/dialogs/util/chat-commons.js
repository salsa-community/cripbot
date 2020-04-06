const { getRandomInt } = require('../../../util/commons');
const personal = ['Lucía', 'Paula', 'María', 'Isabella', 'Jimena', 'Sara', 'Laura'];
const { infoQuickReplies } = require('./info-quick-replies');
const { BOT_CLIENT_RED_COFIDI__ID } = require('./constants')

/**
 * This is the hello event
 */
exports.hello = function (bot, message) {
    bot.say({ text: 'Bienvenido a ATEB' });
    bot.say({ text: 'Mi nombre es ' + personal[getRandomInt(0, personal.length - 1)] });
    if(message.user == BOT_CLIENT_RED_COFIDI__ID){
        bot.say({ text: 'RedCofidi es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas' });
    }else{
        bot.say({ text: 'WebPack es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas' });
    }
    bot.reply(message, {
        text: '¿Requiere ayuda con el servicio de RedCofidi?',
        quick_replies: infoQuickReplies
    }, function () { });
}

/**
 * This is the welcome_back event
 */
exports.welcomeBack = function (bot, message) {
    bot.say({ text: 'Bienvenido de nuevo a ATEB' });
    if(message.user == BOT_CLIENT_RED_COFIDI__ID){
        bot.say({ text: 'RedCofidi es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas' });
    }else{
        bot.say({ text: 'WebPack es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas' });
    }    
    bot.say({ text: 'Mi nombre es ' + personal[getRandomInt(0, personal.length - 1)] });
    bot.reply(message, {
        text: '¿Requiere ayuda con el servicio de RedCofidi?',
        quick_replies: infoQuickReplies
    }, function () { });
}