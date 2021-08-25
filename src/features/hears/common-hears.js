const { i18n } = require('@util/lang');

module.exports = function (controller) {
    controller.hears(['hey', 'hi', 'hello', 'hola'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.hello', message.user_profile.lang));
    });

    controller.hears(['eres real', 'quien eres', 'who are you'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('bot.whoare', message.user_profile.lang));
    });

    controller.hears(['como te llamas', 'tienes nombre', 'cual es tu nombre?', 'nombre', 'name'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('bot.name', message.user_profile.lang, message.user_profile.asistente));
    });

    controller.hears(['como estas', 'how are you'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('bot.state', message.user_profile.lang));
    });

    controller.hears(['good morning', 'morning', 'good night', 'good afternoon', 'buenos dias', 'buenas noches', 'buenas tardes', 'buena tarde'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.nice-to-see-you', message.user_profile.lang));
    });

    controller.hears(['adios', 'a dios', 'hasta pronto', 'bye', 'see you', 'hasta luego'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.attended', message.user_profile.lang));
    });

    controller.hears(['no', 'no gracias', 'en otro momento', 'no thanks', 'no thank you'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.negative', message.user_profile.lang));
        await bot.reply(message, i18n('help.be-online', message.user_profile.lang));
    });

    controller.hears(['gracias', 'thank you', 'thanks'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('help.attended-alternative', message.user_profile.lang));
    });

    controller.hears(['te gusta', 'who are you'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('common.preferences', message.user_profile.lang));
    });

    controller.hears(['que haces', 'what do you do'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('common.what-are-you-doing', message.user_profile.lang));
    });

    controller.hears(['ubicacion', 'en donde estas', 'que ubicacion tiene', 'where are you'], 'message', async (bot, message) => {
        await bot.reply(message, i18n('common.location', message.user_profile.lang));
    });

    controller.hears(['cual es tu email'], 'message', async (bot, message) => {
        await bot.reply(message, 'cst@conacyt.mx');
    });

    controller.hears(['conacyt'], 'message', async (bot, message) => {
        await bot.reply(message, 'El Consejo Nacional de Ciencia y Tecnología fue creado por disposición del H. Congreso de la Unión el 29 de diciembre de 1970');
        await bot.reply(message, 'como un organismo público descentralizado del Estado, no sectorizado, con personalidad jurídica y patrimonio propio');
        await bot.reply(message, 'que goza de autonomía técnica, operativa y administrativa; tiene por objeto ser la entidad asesora del Ejecutivo Federal ');
        await bot.reply(message, 'y especializada para articular las políticas públicas del gobierno federal y promover el desarrollo de la investigación científica');
    });
}