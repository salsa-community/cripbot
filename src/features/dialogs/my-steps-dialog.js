const {DataBase} = require('@util/for-training');
const {Normalizacion} = require('@util/text');

const { i18n } = require('@util/lang');
const { MY_STEP_DIALOG_ID } = require('@feature/dialogs/util/constants')
const { BotkitConversation } = require('botkit')
const { config } = require('@config');
const TYPING_DELAY = config.bot.app.typingdelay;

module.exports = function (controller) {
    
    let convo = new BotkitConversation(MY_STEP_DIALOG_ID, controller);

    convo.addAction('get-steps-thread')
    convo.addMessage({ type: 'typing', action: 'nombre-thread' }, 'get-steps-thread');
    //-----------------------------------------------------------------------------------------------------------
    convo.addAction('nombre-thread');
    convo.addQuestion({text: 'Hola Cual es tu nombre?'},[{
        default: true,
        handler: async (response, convo, bot) => {
            console.log('dentro de la función---------')
            convo.vars.ruta=[0,0,0,0];
            let ElNombre='';
            CR=0
            let Frases={
                inicio:{
                    "Ini1":"Hola ",
                    "Ini2":"Mucho gusto, ",
                    "Ini3":" ",
                    "Ini4":"Saludos ",},
                menu:{
                    "menu1":" tal vez te interese conocer sobre.,  ",
                    "menu2":" la información que tengo es sobre.,  ",
                    "menu3":" mi menú principal es: <br> ",
                    "menu4":" ¿buscas alguno de estos temas?  ",
                    "menu5":" dime sobre que deseas conocer.,  ",}}

            VResp=response.split(' ')
            for(p in VResp){
                let R=Nombres(VResp[p])
                if(R!=''){
                    ElNombre = R}}
            convo.vars.ElNombre=ElNombre

            let MiMenu=Object.keys(DataBase);
            let LMiMenu=MiMenu.length;
            let MenuL=''
            for(let r=0;r<=LMiMenu-3;r++){
                MenuL=MenuL+' '+MiMenu[r]+', '}
            MenuL=MenuL+' '+MiMenu[LMiMenu-2]+' ó '
            MenuL=MenuL+' '+MiMenu[LMiMenu-1]

            let ObjInic = Object.keys(Frases["inicio"])
            let RandIni = Frases["inicio"][ObjInic[Math.floor(Math.random()*(ObjInic.length))]];
            let ObjMenu = Object.keys(Frases["menu"])
            let RandMen = Frases["menu"][ObjMenu[Math.floor(Math.random()*(ObjMenu.length))]];
            let frase=RandIni+ElNombre+RandMen+MenuL

            bot.say({ text: frase});
            bot.say({ type: 'typing' }, 'typing');
            if(response=='salir'){await convo.gotoThread('exit-thread');}
            else{await convo.gotoThread('menu-1-thread');}
        }}], 'nombre-thread', 'nombre-thread');
    //-----------------------------------------------------------------------------------------------------------
    convo.addAction('menu-1-thread');
    convo.addQuestion({text: 'Dime sobre cual tema te interesa conocer?'},[{
        default: true,
        handler: async (response, convo, bot) => {
            let RUTA=convo.vars.ruta;
            let ElNombre = convo.vars.ElNombre            
            console.log('LA RUTA ES:-------    ',RUTA)//******************************************             
            response = Normalizacion(response)
            let Ramificacion=DataBase;
            let Ram=Object.keys(Ramificacion);
            let cR=0;
            while(RUTA[cR]!=0){
                Ramificacion=Ramificacion[Ram[RUTA[cR]-1]];
                Ram=Object.keys(Ramificacion);
                cR=cR+1;
            }
            let MiMenu=Object.keys(Ramificacion)
            console.log('DENTRO DEL MENU:    ',MiMenu)//****************************************** 

            let ruta = Intencion(MiMenu,response)
            if(ruta!=[0,0]){
                RUTA[cR]=ruta[0]
                cR=cR+1
            }

            let Frases={
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

            console.log('MI RUTA:    ',RUTA)//----------------------------------------------------

            Ramificacion=DataBase;
            Ram=Object.keys(Ramificacion);
            let cr=0;
            while(RUTA[cr]!=0){
                Ramificacion=Ramificacion[Ram[RUTA[cr]-1]];
                Ram=Object.keys(Ramificacion);
                cr++}
            ObjK=Object.keys(Ramificacion)
            console.log('EL OBJETO ES:   ',ObjK)//----------------------------------------------------
            LObjK=ObjK.length
            let MenuL=''
            if(LObjK<30){
                for(let r=0;r<=LObjK-3;r++){
                    MenuL=MenuL+' '+ObjK[r]+', '}
                MenuL=MenuL+' '+ObjK[LObjK-2]+' ó ' 
                MenuL=MenuL+' '+ObjK[LObjK-1]}
            else{MenuL=Ramificacion}

            console.log('EL MenuL ES:   ',MenuL)//----------------------------------------------------
            console.log('EL CR(NÚMERO) ES: ',cr)//----------------------------------------------------

            if(cr==1){
                let ObjIntr = Object.keys(Frases["inter1"])
                let RandNtr = Frases["inter1"][ObjIntr[Math.floor(Math.random()*(ObjIntr.length))]];
                frase=RandNtr+MenuL+'?'}
            else{
                if(cr==2){
                    let ObjIntr = Object.keys(Frases["inter2"])
                    let RandNtr = Frases["inter2"][ObjIntr[Math.floor(Math.random()*(ObjIntr.length))]];
                    frase=RandNtr+MenuL+'?'
                }
                else{
                    if(cr==3){
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
            console.log('FINALMENTE LA FRASE ES:   ',frase)
            bot.say({ text: frase});
            bot.say({ type: 'typing' }, 'typing');

            convo.vars.ruta=RUTA;
            if(ruta==[0,0]){await convo.gotoThread('Menu-o-Salir-thread');}
            else{await convo.gotoThread('menu-1-thread');}
        }}],'menu-1-thread', 'menu-1-thread');
    //----------------------------------------------------------------------------------------------------------- 
    
    

    convo.addAction('Menu-o-Salir-thread');
    convo.addQuestion({text: 'No encuentro lo que buscas, desear salir o ir al menú principal?'},[{
        default: true,
        handler: async (response, convo, bot) => {
            response = Normalizacion(response)
            if(response=='salir'){await convo.gotoThread('exit-thread');}
            else{await convo.gotoThread('nombre-thread')}
        }}], 'Menu-o-Salir-thread', 'Menu-o-Salir-thread');
    //-----------------------------------------------------------------------------------------------------------
    /** Exit Thread */
     convo.addAction('exit-thread');
     convo.addMessage('{{vars.userinfo_contact_be_here}}', 'exit-thread');
    //-----------------------------------------------------------------------------------------------------------
    /* Init common variables into the Dialog */
    convo.before('default', async (convo, bot) => {
        convo.setVar('userinfo_contact_be_here', i18n('dialogs.userinfo.behere', convo.vars.lang));
    });

    convo.before('exit-thread', async () => {
        return new Promise((resolve) => {
            setTimeout(resolve, TYPING_DELAY);
        });
    });

    controller.addDialog(convo);
}


function Nombres(TextFBN){
    let nombre =''
    TextFBN=TextFBN.charAt(0).toUpperCase().concat(TextFBN.substring(1, TextFBN.length))
    let TNombresH=["Hugo","Martin","Lucas","Mateo","Leo","Daniel","Alejandro","Pablo","Manuel","Alvaro","Adrian","David","Mario","Enzo","Diego","Marcos","Izan","Javier","Marco","Alex","Bruno","Oliver","Miguel","Thiago","Antonio","Marc","Carlos","Angel","Juan","Gonzalo","Gael","Sergio","Nicolas","Dylan","Gabriel","Jorge","Jose","Adam","Liam","Eric","Samuel","Dario","Hector","Luca","Iker","Amir","Rodrigo","Saul","Victor","Francisco","Ivan","Jesus","Jaime","Aaron","Ruben","Ian","Guillermo","Erik","Mohamed","Julen","Luis","Pau","Unai","Rafael","Joel","Alberto","Pedro","Raul","Aitor","Santiago","Rayan","Pol","Nil","Noah","Jan","Asier","Fernando","Alonso","Matias","Biel","Andres","Axel","Ismael","Marti","Arnau","Imran","Luka","Ignacio","Aleix","Alan","Elias","Omar","Isaac","Youssef","Jon","Teo","Mauro","Oscar","Cristian","Leonardo","Abel","Adrian","Alejandro","Angel","Carlos","Cesar","Bruno","Daniel","Dario","David","Diego","Emilio","Fabian","Felipe","Gabriel","Hector","Hugo","Jacobo","Jaime","Joaquin","Juan","Leonardo","Leo","Lucas","Marcos","Martin","Mateo","Matias","Miguel","Nicolas","Pablo","Raul","Samuel","Santiago","Sebastian","Tomas","Tristan","Joan","Andres","Ricardo","Manuel","Ezequiel","Francisco","Elias","Blas","Alfonso","Ulises","Gerardo",
    "Alfredo","Alvaro","Amadeo","Amancio","Antonio","Baltasar","Beltran","Benito","Rufino","Boris","Camilo","Ciro","Conrado","Donato","Florentino","Saturnino","Segundo","Anastasio","Cipriano","Teofilo","Casimiro","Bonifacio","Victorino","Eleuterio","Urbano","Severino","Inocencio","Primitivo","Bautista","Agapito","Benedicto","Enrique","Eugenio","Estanislao","Fausto","Faustino","Felipe","Felix","Fermin","Francisco","Gaspar","Genaro","Hilario","Hugo","Ignacio","Ireneo","Ismael","Joaquin","Jose","Juan","Julian","Justo","Leopoldo","Leon","Lisandro","Lorenzo","Lucas","Manuel","Mateo","Pedro","Pio","Romeo","Roque","Rufino","Santiago","Salvador","Simon","Valentin","Valentino","Vicente","Victor","Abundio","Ambrosio","Aniceto","Anselmo","Apolonio","Aquilino","Arsenio","Atanasio","Atilano","Avelino","Bartolo","Basilio","Baudilio","Benigno","Buenaventura","Calixto","Celedonio","Cirilo","Clemente","Conrado","Crisostomo","Crispin","Crispulo","Dionisio","Eliodoro","Eliseo","Emerico","Emeterio","Epifanio","Eufrasio","Eulogio","Feliciano","Florencio","Froilan","Fructuoso","Frutos","Gregorio","Gumersindo","Hermenegildo","Herminio","Higinio","Hipolito","Indalecio","Isidoro","Laureano","Leandro","Leocadio","Leovigildo","Lope","Macario","Meliton","Nemesio","Nicanor",
    "Niceto","Nicomedes","Odon","Orencio","Pantaleon","Patricio","Perfecto","Petronilo","Policarpo","Polonio","Prudencio","Regino","Remigio","Romulo","Ruperto","Sandalio","Serapio","Servando","Silvestre","Sinforoso","Sofronio","Telesforo","Tiburcio","Toribio","Ulpiano","Valeriano","Venancio","Victoriano","Zoilo","Abdon","Abilio","Acacio","Adalberto","Adolfo","Afrodisio","Agabo","Albino","Alcibiades","Amalio","Amasvindo","Amelio","Amonario","Antelmo","Antioco","Antenor","Argimiro","Darek","Enrique","Osiel","Samuel","Adan","Azarias","Gabriel","Kerr","Oliphant","Uzziel","Noe","Abel","Abihail","A,ki,til","Alcibiades","Azai","Azubuike","Baladeva","Booz","Bricio","Emery","Everaldo","Fergal","Hipocrates","Kon","Jaaziel","Jaret","Meginhard","Michio","Obelix","Oier","Olegario","Otoniel","Ozias","Oziel","Qiang","Tyre","Aubrey","Chelem","Chinweike","Iyad","Jigme","Kanda","Meinardo","Osvaldo","Socrates","Thilo","Walter","Armando","Hariman","Fynn","Ricardo","Bernardo","Duncan","Gunther","Leo","Olegario","Odin","Ivar","Archie","Alejandro","Gerardo","Humberto","Alan","Alano","Albano","Aldahir","Allen","Alucio","Ambiorix","Arlen","Artai","Arturo","Artus","Avon","Bardo","Belenos","Belenus","Beloveso","Brayan","Brian","Brenan","Brent","Breogan","Briccio","Carataco",
    "Casey","Cearbhall","Cedrick","Sedrik","Cernunnos","Cuchulain","Dagda","Dailin","Daly","Declan","Dilan","Diviciaco","Donaldo","Donardo","Douglas","Druso","Dugan","Eamon","Eirian","Elbio","Erwin","Esus","Fergie","Finn","Flocelo","Floyd","Gaela","Gallagher","Galvan","Gannicus","Garnik","Glen","Gordon","Gwyddyon","Herve","Idris","Inigo","Kalen","Kellan","Kelvin","Kendall","Kenneth","Kenny","Kerman","Kevin","Kilian","Lennox","Lug","Maddox","Mael","Manannan","Marvin","Melvin","Merlin","Morgan","Neil","Niall","Nelson","Nuada","Ogmios","Oscar","Ossian","Owen","Quillan","Quinn","Rafferty","Ronan","Sayer","Serbal","Sucellos","Taranis","Tristan","Viriato","Vicente","Rodrigo","Marcos","Fernando","Roberto","Carlos","Raul","Marcelo","Fermin","Cesar","Ernesto","Alexander","Mateo","Daniel","Pablo","Alvaro","Adrian","David","Diego","Javier","Mario","Sergio","Marcos","Manuel","Martin","Jorge","Ivan","Carlos","Miguel","Lucas","Santiago","Matias","Angel","Gabriel","Simon","Thiago","Valentin","Julian","Benjamin","Erick","Sasha","Dante","Enzo","Silas","Marco","Andrea","Ariel","Orfeo","Jason","Hector","Aquiles","Adonis","Apolo","Dionisio","Ulises","Hercules","Hipolito","Tristan","Zeus","Adal","Adel","Adriel","Alonso","Amaru","Asher","Azai","Basil","Bastian","Ciro",
    "Corban","Daire","Dante","Dorian","Duncan","Egan","Einar","Elian","Emile","Endor","Ezra","Farid","Fionn","Gadiel","Gael","Goran","Guido","Hasani","Ian","Ilan","Ivar","Joel","Julian","Kadet","Kai","Karim","Kilian","Kuno","Lars","Lavi","Leonel","Lisandro","Luc","Malik","Marius","Milos","Mosi","Nadir","Naim","Normand","Oliver","Oriel","Otto","Pavel","Pax","Piero","Raziel","Rune","Sander","Sinhue","Tadeo","Teo","Tristan","Umi","Uriel","Yael","Yerik","Zaid","Adam","Agustin","Aitor","Alan","Alberto","Alejandro","Alfonso","Alfredo","Antonio","Asier","Axel","Baltasar","Bautista","Benicio","Biel","Bruno","Cesar","Cristian","Domingo","Dylan","Eduardo","Enrique","Erik","Ernesto","Fabio","Felipe","Felix","Fermin","Adal","Adrien","Aketx","Alatz","Aldan","Alec","Alessio","Andeka","Andros","Aomar","Aris","Armengol","Arnulfo","Asel","Auritz","Bayron","Bieito","Brandon","Calvin","Daren","Defin","Demian","Domingo","Dominic","Drako","Edey","Eneas","Enetz","Fabrizio","Felix","Guiem","Guiu","Gus","Hadrian","Hermes","Homero","Igor","Igotz","Ilian","Isacio","Jacques","Jael","Jano","Kerizo","Levi","Lian","Lorenzo","Luca","Maiol","Manoel","Marvin","Mateo","Matias","Maurino","Max","Maximo","Milan","Milo","Mirko","Nils","Otto","Raico","Ramos","Roman","Roque","Seneca",
    "Thor","Xanti","Yone","Adam","Alex","Amaro","Andrea","Archie","Axel","Asher","Basil","Biel","Bran","Bruno","Ciro","Daire","Dante","Dario","Daryl","Dylan","Einar","Elian","Enzo","Erik","Ezra","Fionn","Gael","Goran","Guido","Hugo","Ian","Iker","Ilan","Ivar","Izan","Joel","Jordan","Kamal","Karim","Kenai","Kendall","Kuno","Luc","Lucas","Lavi","Leo","Leon","Liam","Mael","Malik","Marc","Marco","Martin","Milan","Mosi","Nadir","Neo","Neymar","Nil","Oliver","Oriel","Orson","Paris","Rayan","Said","Sasha","Silas","Taranis","Taylor","Teo","Theo","Thiago","Umi","Urko","Van","Viggo","Yael","Yonatan","Zaid","Zyan","Alejandro","Diego","Adrian","Alvaro","Pablo","Daniel","Giuseppe","Napoleon","Jacobo","Astor","Doug","Ren","Stimpy","Carel","Gerard","Enaut","Bittor","Victor","Hugo","Albert","Gabriel","Oscar","Bastian","Harry","Peter","Hansel","Abel","Agni","Blas","Cosme","Damian","Elio","Esau","Fidel","Gaspar","Hector","Hernan","Ivan","Jaime","Keanu","Melchor","Noe","Oto","Pio","Prakash","Brais","Iago","Anxo","Anton","Xoel","Roi","Alexandre","Xabier","Xian","Lois","Breixo","Andre","Xoan","Xavier","Xurxo","Breogan","Denis","Paulo","Nuno","Uxio","Martino","Xavi","Xose","Xabi","Xacobe","Artai","Eloi","Xan","Aldan","Cibran","Marc","Leo","Alex","Jan","Nil","Pol","Adiran","Aitor","Albin","Andoni","Ander","Antxon","Aratz","Ardaitz","Argi","Argider","Aritz","Arnaut","Artur","Asteri","Baladi","Baltz","Bazkoare","Beraun","Bernat","Bikendi","Biktor","Dabi","Dari","Dogartzi","Damen","Dunixi","Edorta","Eki","Ekaitz","Eladi","Elixi","Emiri","Endrike","Eritz","Etor","Euken","Ferran","Frantzes","Frantzisko","Ganiz","Gari","David","Amador","Harsal","Romeo","Valentin","Erasmo","Eros","Amadis","Tadeo","Paris","Amadeo","Amado","Aziz","Darrell","Daryl","Davet","Davis","Dawit","Felipe","Habib","Kelvin","Lennon","Milos","Riku","Valentiniano","Valentino","Adir","Carwyn","Can","Connolley","Krishna","Jeb","Erasmus","Milan","Tristan","Antonio","Calixto","Connor","Timoteo","Ville","Agapi","Amori","Ehud","Gaara","Mishka","Rudo","Heathcliff","Fitzwilliam","Charles","Florentino","Pedro","Armando","Robert","Felix","Ricardo","Gines","Maximo","Cesar","Alfredo","Eugenio","Blas","Gerardo","Nicolas","Aiko","Anwyl","Amias","Davi","Dilber","Gerwyn","Jaimin","Jed","Kiefer","Layden","Lowell","Luben","Navid","Raman","Sevilin","Taavi","Wilmer","Yadid","Oliver","Santiago","Rodrigo","Dorian","Holden","Alonso","Julio","Hector","Leon",
    "Ramon","Robin","Mario","Gustavo","Jacinto","Tristan","Jack","Edward","Liesl","Henry","Wesley"]
    let TNombresM=["Sofia","Lucia","Maria","Paula","Daniela","Valeria","Julia","Alba","Claudia","Isabella","Romina","Jimena","Emma","Irene","Martina","Sara","Laura","Charlotte","Violet","Eleanor","Lucy","Evelyn","Adeline","Alice","Adelaide","Elizabeth","Samantha","Scarlett","Amalia","Olivia","Isla","Ava","Cora","Lucy","Chloe","Renata","Camila","Regina","Dulce","Veronica","Alessandra","Alessia","Alfonsina","Antonella","Bianca","Carina","Chiara","Fiorella","Francesca","Gabriella","Gianna","Lorenza","Marena","Mellea","Nicoletta","Orazia","Pia","Stella","Zinerva","Azahara","Farah","Fatima","Habiba","Halima","Kalila","Karima","Malika","Nayla","Rada","Sabira","Salma","Samira","Zaida","Zara","Pandora","Ariadna","Fedra","Casandra","Helena","Electra","Leda","Penelope","Antigona","Calipso","Andromeda","Ada","Amelia","Carlota","Catalina","Clara","Emilia","Frida","Manuela","Marie","Olimpia","Victoria","Rosa","Rita","Dian","Valentina"]
    if(TNombresH.includes(TextFBN)){nombre=TextFBN;}
    if(TNombresM.includes(TextFBN)){nombre=TextFBN;}
    return nombre
}


function Intencion(ObjK,Frce){
    let Vp=[0,0],NMx=0;
    let Pronombres=['a','yo','me','mi','nos','nosotras','nosotros','conmigo','te','tu','ti','usted','ustedes','vos','vosotras','vosotros','contigo','el','ella','ellas','ello','ellos','la','las','lo','los','le','les','se','si','consigo','aquellas','aquel','aquella','aquellos','aquello','esas','ese','esa','esos','esta','este','estas','estos','algo','alguien','alguna','alguno','cualesquiera','cualquiera','demas','misma','mismo','mismas','mismos','mucha','mucho','muchas','muchos','nada','nadie','ninguna','ninguno','ningunas','ningunos','otra','otro','otros','poca','poco','pocas','pocos','quienquier','quienquiera','quienesquiera','tanta','tanto','tantas','tantos','toda','todo','todos','ultima','ultimo','ultimas','ultimos','una','uno','unas','unos','varias','varios','adonde','como','cual','cuales','cuando','cuanta','cuanto','cuantas','cuantos','donde','que','quien','quienes','cuya','cuyo','cuyas','cuyos']
    let VK = Array(ObjK.length).fill(0);
    let c=0;
    for(let K of ObjK){
        K=K.split(" ")
        let oracion=Array()
        for(let k of K){
            k=k.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, '').replace(/[.]/g,'').replace('b','v').replace('z','s')
            if(!Pronombres.includes(k)){
                oracion.push(String(k))}}
        let oracionf=Array()
        LFrce=Frce.length
        for(let i in Frce){
            if(!Pronombres.includes(Frce[i])){
                oracionf.push(String(Frce[i]))
                var LFrce=String(Frce[i]).length;
                for(let v in oracion){
                    let VKT=0;
                    let LnghP=oracion[v].length
                    PA=oracion[v];PB=String(Frce[i])
                    LPA=PA.length;LPB=PB.length
                    if(String(Frce[i]).length>oracion[v].length){
                        PB=oracion[v];PA=String(Frce[i])
                        LPB=PB.length;LPA=PA.length}
                    for(let LD=0;LD<=LPA-LPB;LD++){
                        if(LPB/LPA>.5){
                        let VKi=0
                        for(let NL=0;NL<LPB;NL++){
                            if(PB[NL]==PA[LD+NL]){VKi++}}
                        if(VKi/LPA>=.667){VKT=VKT+VKi/LPA}}
                        VK[c]+=VKT/oracion.length;}}}}
        if(NMx<VK[c]){
            NMx=VK[c]
            Vp[0]=c+1
            Vp[1]=NMx
        }
        c++;
    }
    console.log('lo que me inteesa:>>>>>>>>',Vp)
    return Vp
}