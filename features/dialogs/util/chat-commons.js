const { getRandomInt } = require('../../../util/commons');
const personal = ['Lucía', 'Paula', 'María', 'Isabella', 'Jimena', 'Sara', 'Laura'];
const { infoQuickReplies } = require('./info-quick-replies');

/**
 * This is the hello event
 */
exports.hello = function (bot, message) {
    bot.say({ text: 'Bienvenido a ATEB' });
    bot.say({ text: 'Mi nombre es ' + personal[getRandomInt(0, personal.length - 1)] });
    bot.say({ text: 'RedCofidi es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas' });
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
    bot.say({ text: 'RedCofidi es un servicio de ATEB para apoyar a sus clientes y proveedores en la verificación de sus facturas' });
    bot.say({ text: 'Mi nombre es ' + personal[getRandomInt(0, personal.length - 1)] });
    bot.reply(message, {
        text: '¿Requiere ayuda con el servicio de RedCofidi?',
        quick_replies: infoQuickReplies
    }, function () { });
}