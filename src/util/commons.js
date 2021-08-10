const { config } = require('@config');
const { i18n } = require('@util/lang');

/**
 * getRandomInt function, it is a utility method
 */

function resolveDescProp(lang) {
    return resolveProp('desc', lang);
}

function resolveProp(prop, lang) {
    if (lang) {
        if (lang === 'es') {
            return prop;
        } else {
            return prop + 'En';
        }
    }
    return prop;
}

exports.resolveProp = resolveProp;
exports.resolveDescProp = resolveDescProp;

exports.getRandomInt = function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.resolveCodigo = function (rawCode, lang) {
    if (!rawCode) {
        return rawCode;
    }
    const matchCode = rawCode.match(/(\d+.*)/)
    if (matchCode) {
        return 'CFDI' + matchCode[0]
    } else {
        return rawCode;
    }
}

exports.resolveOptions = function (page, lang, excludePlus) {
    let options = [];
    let descLang = resolveDescProp(lang);
    page.forEach(element => {
        options.push({ title: element[descLang], payload: element.clave })
    });
    if (!excludePlus) {
        options.push({ title: '<b><i>' + i18n('general.ver-mas', lang) + '</i></b>', payload: config.bot.app.nextlabel })
    }
    return options;
}

exports.arrayToReplies = function (replies) {
    let quickReplies = [];
    if (replies && replies.length > 0) {
        for (let index = 0; index < replies.length; index++) {
            quickReplies.push({
                title: replies[index],
                payload: replies[index],
            });
        }

    } else {
        return [];
    }
    return quickReplies;
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

    if (hrs < 12 && hrs >= 6) {
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

// TODO: cambiar de O(N2) a O(lgn)
exports.resolveIntent = function (flows, message) {
    if (flows) {
        for (let i = 0; i < flows.length; i++) {
            const flow = flows[i];
            let claveMatch = message.match(new RegExp("^" + flow.clave + "$", 'i'));
            if (claveMatch) {
                return flow.clave;
            }
            for (let j = 0; j < flow.hears.length; j++) {
                const hear = flow.hears[j];
                let founted = message.match(new RegExp(hear, 'gi'));
                if (founted) {
                    return flow.clave;
                }
            }
        }

    } else { return undefined }
}
exports.resolveMessage = function (message, context) {
    context.username = context.username ? context.username : '';
    return message
        .replace(/\$ORGANIZACION/gi, context.organizacion)
        .replace(/\$CONTEXTO/gi, context.nombre)
        .replace(/\$USUARIO/gi, context.username);
}

exports.resolveMessageWithUsername = function (message, username) {
    username = username ? username : '';
    return message
        .replace(/\$USUARIO/gi, username);
}

