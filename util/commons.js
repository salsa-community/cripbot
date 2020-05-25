const { solicitudesGenerales } = require('../features/dialogs/util/info-quick-replies');
const { PAGINATOR_NEXT_LABEL } = require('../config');

/**
 * getRandomInt function, it is a utility method
 */
const offset = 3;

exports.getRandomInt = function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.resolveCodigo = function (rawCode) {
    const matchCode = rawCode.match(/(\d+.*)/)
    if (matchCode) {
        return 'CFDI' + matchCode[0]
    } else {
        for (let index = 0; index < solicitudesGenerales.length; index++) {
            const element = solicitudesGenerales[index]
            if (element.payload == rawCode) {
                return rawCode
            }
        }
    }
}

exports.resolveOptions = function (page) {
    let options = [];
    page.forEach( element => {
        options.push({ title: element.desc , payload: element.clave })
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