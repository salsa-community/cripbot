const { solicitudesGenerales } = require('../features/dialogs/util/info-quick-replies');

/**
 * getRandomInt function, it is a utility method
 */
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