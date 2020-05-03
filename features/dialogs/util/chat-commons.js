const { getRandomInt } = require('../../../util/commons');
const personal = ['Lucía', 'Paula', 'María', 'Isabella', 'Jimena', 'Sara', 'Laura'];
const { infoQuickReplies } = require('./info-quick-replies');
const { BOT_CLIENT_RED_COFIDI__ID } = require('./constants')
const { typing } = require('../../../util/bot.typing');

/**
 * This is the hello event
 */
exports.hello = async function (bot, message) {
    await typing(bot, message, 'Bienvenido a ATEB');
    if(message.user == BOT_CLIENT_RED_COFIDI__ID){
        await typing(bot, message, 'Red COFIDI es un servicio para intercambiar Comprobantes Fiscales Digitales de una manera rápida y segura.');
    }else{
        await typing(bot, message, 'PAC Web es un servicio de ATEB para apoyar a sus clientes.');
    }   
    await typing(bot, message, 'Mi nombre es ' + personal[getRandomInt(0, personal.length - 1)]);
    await typing(bot, message, {
        text: '¿Requiere ayuda con el servicio?',
        quick_replies: infoQuickReplies
    });
}

/**
 * This is the welcome_back event
 */
exports.welcomeBack = async function (bot, message) {
    await typing(bot, message, 'Bienvenido de nuevo a ATEB');
    if(message.user == BOT_CLIENT_RED_COFIDI__ID){
        await typing(bot, message, 'Red COFIDI es un servicio para intercambiar Comprobantes Fiscales Digitales de una manera rápida y segura.');
    }else{
        await typing(bot, message, 'PAC Web es un servicio de ATEB para apoyar a sus clientes.');
    }    
    await typing(bot, message, 'Mi nombre es ' + personal[getRandomInt(0, personal.length - 1)]);
    await typing(bot, message, {
        text: '¿Requiere ayuda con el servicio?',
        quick_replies: infoQuickReplies
    });
}