/**
 * Initi configuration 
 * for the bot
 * 
 */

getRandomInt = function (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const personal = ['María', 'Isabella', 'Jimena', 'Laura'];
let persona = personal[getRandomInt(0, personal.length - 1)]
let avatar = persona.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ".png"
document.getElementById("avatar-bot").src = "/images/avatares/" + avatar;
var options = { id: 'RedCofidi', asistente: persona };
Botkit.boot(options);
Botkit.deactivate();
setTimeout(
  function () {
    Botkit.activate();
  }, 600);