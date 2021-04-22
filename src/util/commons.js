const { solicitudesGenerales } = require('@feature/dialogs/util/info-quick-replies');
const config = require('@config');
const { i18n } = require('@util/lang');

/**
 * getRandomInt function, it is a utility method
 */
const offset = 3;

function resolveDescProp(lang) {
    if (lang) {
        if (lang === 'es') {
            return 'desc'
        } else {
            return 'descEn'
        }
    }
    return 'desc';
}

exports.resolveDescProp = resolveDescProp;

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
        return rawCode;
    }
}

exports.resolveOptions = function (page, lang) {
    let options = [];
    let descLang = resolveDescProp(lang);
    page.forEach(element => {
        options.push({ title: element[descLang], payload: element.clave })
    });
    options.push({ title: '<b><i>' + i18n('general.ver-mas', lang) + '</i></b>', payload: config.bot.app.nextlabel })
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
    if (word) {
        return word.replace(/(\r\n|\n|\r)/gm, "<br>");
    } else {
        return '';
    }
}

