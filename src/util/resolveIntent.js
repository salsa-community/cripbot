const {DataBase} = require('@util/for-training');

var ruta= Array(4).fill(0)
var CR=0,NMx=0;
var Vp= Array(4).fill(0)
var Ramificacion=DataBase;

exports.Intencion = function(Frce){
    let Out=Frce
    let ObjK=Object.keys(Ramificacion);
    ObjK.push('menu regresar inicio')
    NMx=0;
    Vp=Array(4).fill(0)
    IntencionF(ObjK,Frce,0)
    let Mxr=[0,0];
    NMx=0;
    for(let r=0;r<ObjK.length-1;r++){
        let ObjKr=Object.keys(Ramificacion[ObjK[r]]);
        IntencionF(ObjKr,Frce,1)
        if(Mxr[0]<Vp[3]){
            Mxr[0]=Vp[3];
            Mxr[1]=r;
        }
    }

    if(Vp[0]+Vp[1]>0){
        if(Vp[2]>Vp[3]){
            if(Vp[0]>Object.keys(Ramificacion).length){
                Ramificacion=DataBase["menu"]
                ruta= Array(4).fill(0)
                ruta[0]="menu"
                CR=1
            }else{
                Ramificacion=Ramificacion[ObjK[Vp[0]-1]]
                ruta[CR]=ObjK[Vp[0]-1]
                CR++
            }
        }
        else{
            let ObjKr=Object.keys(Ramificacion[ObjK[Mxr[1]]])
            Ramificacion=Ramificacion[ObjK[Mxr[1]]]
            ruta[CR]=ObjK[Mxr[1]]
            CR++
            Ramificacion=Ramificacion[ObjKr[Vp[1]-1]]
            ruta[CR]=ObjKr[Vp[1]-1]
            CR++
         }
        Out='Alerta'}
        //<<<<<<< console.log('MI RUTA:   ',ruta)

    return Out;
}

function IntencionF(ObjK,Frce,N){
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
                    for(let LD=0;LD<=LnghP-LFrce;LD++){
                        if(LFrce/LnghP>.5){
                        let VKi=0
                        for(let NL=0;NL<LFrce;NL++){
                            if(String(Frce[i])[NL]==oracion[v][LD+NL]){VKi++}}
                        if(VKi/LnghP>=.667){VKT=VKT+VKi/LnghP}}
                        VK[c]+=VKT/oracion.length;}}}}
        if(NMx<VK[c]){
            NMx=VK[c]
            Vp[N]=c+1
            Vp[N+2]=NMx
        }
        console.log("ESTE ES EL QUE ME INTERESA:  ",Vp[N],'---',Vp[N+2],'---',N)
        c++;
    }
    return Vp
}

exports.Ruta = function(){
    ruta=ruta
    return ruta
}