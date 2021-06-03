const { config } = require('@config');

exports.typing = async function (bot, message, text, delay) {
    if (!delay) { delay = config.bot.app.typingdelay }
    await bot.reply(message, { type: 'typing' });
    return new Promise((resolve) => {
        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.reply(message, text);
            resolve(true);
        }, delay);
    });
}
