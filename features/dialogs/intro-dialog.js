module.exports = function (controller) {
    controller.hears('spider-man saludo', 'message', async (bot, message) => {
        bot.reply(message, "hello super-man");
    })
    controller.hears('spider-man', 'message', async (bot, message) => {
        await bot.reply(message, "hello spider-man");
    });
}