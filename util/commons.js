const { solicitudesGenerales } = require('../features/dialogs/util/info-quick-replies');
const { PAGINATOR_NEXT_LABEL } = require('../config');
const { i18n } = require('@util/lang');

/**
 * getRandomInt function, it is a utility method
 */
const offset = 3;

exports.getRandomInt = function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.resolveCodigo = function (rawCode, lang) {
    const matchCode = rawCode.match(/(\d+.*)/)
    if (matchCode) {
        return 'CFDI' + matchCode[0]
    } else {
        let mensajesGenerales = solicitudesGenerales(lang);
        for (let index = 0; index < mensajesGenerales.length; index++) {
            const element = mensajesGenerales[index]
            if (element.payload == rawCode) {
                return rawCode
            }
        }
    }
}

exports.resolveOptions = function (page) {
    let options = [];
    page.forEach(element => {
        options.push({ title: element.desc, payload: element.clave })
    });
    options.push({ title: '<b><i>Ver más...</i></b>', payload: PAGINATOR_NEXT_LABEL })
    return options;
}


exports.resolvePageNumber = function (page) {
    if ((typeof page === 'undefined')) {
        return 0;
    } else {
        return page + 1;
    }
}

exports.resolveGreeting = function (lang) {
    let currentDate = new Date();
    let hrs = currentDate.getHours();

    if (hrs < 12) {
        return i18n('welcome.morning', lang);
    }
    else if (hrs >= 12 && hrs <= 17) {
        return i18n('welcome.afternoon', lang);
    }
    else {
        return i18n('welcome.night', lang);
    }

}

exports.normalize = function (word) {
    return word.replace(/(\r\n|\n|\r)/gm, "<br>");
}

exports.resolveDescProp = function (lang) {
    if (lang) {
        if (lang === 'es') {
            return 'desc'
        } else {
            return 'descEn'
        }
    }
    return 'desc';
}
