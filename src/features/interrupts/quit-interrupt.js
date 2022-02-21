/**
 * This interrupt is for reset all the dialogs
 * 
 * @author danimaniARQSOFT
 */
 const { menuQuickReplies } = require('@feature/dialogs/util/info-quick-replies');
 const { resolveSaludo } = require('@util/dialogs');
 const { typing } = require('@util/bot.typing');
 const { i18n } = require('@util/lang');
 
 const {Nombres} = require('@util/text');
 const {Ruta} = require('@util/resolveIntent');
 const {DataBase} = require('@util/for-training');
 
 let cancelEn = i18n('general.cancel', 'en');
 let cancelEs = i18n('general.cancel', 'es');
 
 module.exports = function (controller) {
     console.log('QUIT-INTERRUPT------')
     controller.interrupts(['hola', 'buenos', 'buenas', 'saludos','buenos dias'], 'message', async (bot, message) => {
         await typing(bot, message, {
             text: resolveSaludo() + Nombres() + ' soy un asistente virtual para guiarte en tu busqueda, ¿Quieres ir a mi menú principal o quieres probar tu pregunta?',
             quick_replies: menuQuickReplies(message.user_profile.lang)            
         });
         await bot.cancelAllDialogs();
     });
     controller.interrupts([cancelEn, cancelEs], 'message', async (bot, message) => {
         await typing(bot, message, {
             text: i18n('general.begin', message.user_profile.lang),
             quick_replies: menuQuickReplies(message.user_profile.lang)
         });
         await bot.cancelAllDialogs();
     });
     //----------------------------------------
     controller.interrupts(['Alerta'], 'message', async (bot, message) => {
             let MiFrase=Frase()
             await typing(bot, message, {
                 text: MiFrase
             });
             await bot.cancelAllDialogs();
     });
     //----------------------------------------
 }
 
 function Frase(ObjK){
     let frase=''
     let ElNombre=Nombres()
 
     let Frases={
         inicio:{
             "Ini1":"Hola ",
             "Ini2":"Mucho gusto, ",
             "Ini3":" ",
             "Ini4":"Saludos ",
         },
         menu:{
             "menu1":" tal vez te interese conocer sobre.,  ",
             "menu2":" la información que tengo es sobre.,  ",
             "menu3":" mi menú principal es: <br> ",
             "menu4":" ¿buscas alguno de estos temas?  ",
             "menu5":" dime sobre que deseas conocer.,  ",
         },
         inter1:{
             "Inter11":"entonces " + ElNombre + " tienes  ",
             "Inter12":"oye " + ElNombre + " entonces habrá  ",
             "Inter13":"OK oye " + ElNombre + " hay  ",
             "Inter14":"perfecto " + ElNombre + " dime si hay "            
         },
         inter2:{
             "Inter21":"Bueno dime., ",
             "Inter22":"Entonces " + ElNombre + " ",
             "Inter23":"Supongo " + ElNombre + " que ",
             "Inter24":"OK " + ElNombre + " si es que entendi "
         },
         inter3:{
             "Inter31":"Mira " + ElNombre + " ",
             "Inter32":" " + ElNombre + " ",
             "Inter33":"OK " + ElNombre + " ",
             "Inter34":"Si " + ElNombre + " mira"
         },        
         soluc:{
             "Sol1":"Mira " + ElNombre + " ",
             "Sol2":" " + ElNombre + " ",
             "Sol3":"OK " + ElNombre + " ",
             "Sol4":"Si " + ElNombre + " mira"
         }
     }
 
     ruta=Ruta()
     var Ramificacion=DataBase;
     let cr=0;
     for(let r=0;r<ruta.length;r++){
         if(ruta[r]!=0){
         Ramificacion=Ramificacion[ruta[r]];cr++}}
     ObjK=Object.keys(Ramificacion)
     LObjK=ObjK.length
     let MenuL=''
     if(LObjK<30){
         for(let r=0;r<=LObjK-3;r++){
             MenuL=MenuL+' '+ObjK[r]+', '}
         MenuL=MenuL+' '+ObjK[LObjK-2]+' ó ' 
         MenuL=MenuL+' '+ObjK[LObjK-1]}
     else{MenuL=Ramificacion}
 
     if(cr==1){
         let ObjInic = Object.keys(Frases["inicio"])
         let RandIni = Frases["inicio"][ObjInic[Math.floor(Math.random()*(ObjInic.length))]];
         let ObjMenu = Object.keys(Frases["menu"])
         let RandMen = Frases["menu"][ObjMenu[Math.floor(Math.random()*(ObjMenu.length))]];
         frase=RandIni+ElNombre+RandMen+MenuL}
     else{
         if(cr==2){
             let ObjIntr = Object.keys(Frases["inter1"])
             let RandNtr = Frases["inter1"][ObjIntr[Math.floor(Math.random()*(ObjIntr.length))]];
             frase=RandNtr+MenuL+'?'
         }
         else{
             if(cr==3){
                 let ObjIntr = Object.keys(Frases["inter2"])
                 let RandNtr = Frases["inter2"][ObjIntr[Math.floor(Math.random()*(ObjIntr.length))]];
                 frase=RandNtr+MenuL+'?'
             }
             else{
                 if(cr==4){
                     let ObjIntr = Object.keys(Frases["inter3"])
                     let RandNtr = Frases["inter3"][ObjIntr[Math.floor(Math.random()*(ObjIntr.length))]];
                     frase=RandNtr+MenuL+'?'
                 }
                 else{
                     let ObjSol = Object.keys(Frases["soluc"])
                     let RandSol = Frases["soluc"][ObjSol[Math.floor(Math.random()*(ObjSol.length))]];
                     frase=RandSol+MenuL
                 }
             }
         }
     }
     return frase
 }


