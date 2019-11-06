/**
 * Main chatbot Controller, this is the main chatbot controller 
 * used by the main engine. This function is just for hello and welcome_back events. 
 * If you want to add new feature, you must use a specific file 
 * 
 * @author danimaniARQSOFT
 */
const { hello, welcomeBack } = require('./commons/chat-commons');

module.exports = function (controller) {
    controller.on('hello', hello);
    controller.on('welcome_back', welcomeBack);
}