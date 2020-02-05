const { solicitudesGenerales } = require('../features/dialogs/util/info-quick-replies');
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
    let leftIndex = page * offset;
    let rightIndex = leftIndex + offset;
    let options = [];
    for (let index = leftIndex; index < solicitudesGenerales.length && index < rightIndex; index++) {
        options.push(solicitudesGenerales[index]);
    }
    options.push({ title: '<b><i>Ver más...</i></b>', payload: 'ver-mas' })
    return options;
}


exports.resolvePageNumber = function (page) {
    if ((typeof page === 'undefined') || ((page * offset) + offset) >= solicitudesGenerales.length) {
        return 0;
    } else {
        return page + 1;
    }
}