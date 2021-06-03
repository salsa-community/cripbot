/**
 * Get a greeting base on the current hour
 */
exports.resolveColor = function (req) {

    if (req.query.color) {
        return req.query.color;
    }

    return '6e1adc';
}

exports.resolveLang = function (req) {

    if (req.query.culture) {
        return req.query.culture.split(/-|_/)[0];
    }

    return undefined;
}

exports.resolveAsistente = function (req) {
    return typeof req.query.asistente === 'undefined' ? 'random' : req.query.asistente;
}


exports.resolveExtension = function (req) {
    return typeof req.query.extension === 'undefined' ? 'png' : req.query.extension;
}