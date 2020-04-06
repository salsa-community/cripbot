/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { helpQuickReplies } = require('../dialogs/util/info-quick-replies');
const { typing } = require('../../util/bot.typing');

module.exports = function (controller) {
    controller.hears(['hey', 'hi', 'hello', 'hola'], 'message', async (bot, message) => {
        await typing(bot, message, 'Hola, estoy para servirte en lo que pueda');
    });

    controller.hears(['[¿]?eres real[?]?'], 'message', async (bot, message) => {
        await typing(bot, message, 'soy una inteligencia artificial, que fue creada para ayudarte');
    });

    controller.hears(['[¿]?tienes nombre[?]?', '[¿]cual es tu nombre[?]?'], 'message', async (bot, message) => {
        await typing(bot, message, 'mi nombre es socrates, y estoy para servirte');
    });

    controller.hears(['ayuda'], 'message', async (bot, message) => {
        await typing(bot, message, {
            text: '¿Te puedo ayudar en alguno de los siguientes temas?:',
            quick_replies: helpQuickReplies
        });
    });

    controller.hears(['[¿]?c[oó]mo est[áa]s[?]?'], 'message', async (bot, message) => {
        await typing(bot, message, 'Me encuentro muy bien, ¡gracias por preguntar!');
        await typing(bot, message, {
            text: '¿Te puedeo apoyar con alguno de los siguientes temas?:',
            quick_replies: helpQuickReplies
        });
    });

    controller.hears(['buenos dias', 'buenas noches', 'buenas tardes'], 'message', async (bot, message) => {
        await typing(bot, message, 'Es un gusto saludarte');
        await typing(bot, message, {
            text: '¿Te puedeo apoyar con alguno de los siguientes temas?:',
            quick_replies: helpQuickReplies
        });
    });

    controller.hears(['adios', 'a dios', 'hasta pronto', 'bye', 'hasta luego'], 'message', async (bot, message) => {
        await typing(bot, message, 'Fue un placer ayudarte, estaré aquí si me necesitas');
    });


    controller.hears(['no', 'no gracias', 'en otro momento'], 'message', async (bot, message) => {
        await typing(bot, message, 'lo entiendo, posiblemente en otro momento');
        await typing(bot, message, 'estaré aquí por si se te ofrece algo');
    });

    controller.hears(['gracias'], 'message', async (bot, message) => {
        await typing(bot, message, 'es un placer poder servirte');
    });

    controller.hears(['test'], 'message', async (bot, message) => {
        console.log(bot);
        await typing(bot, message, message.user);
    });
}