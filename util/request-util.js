/**
 * Get a greeting base on the current hour
 */
exports.resolveColor = function (req) {

    if (req.query.color) {
        return req.query.color;
    }

    return '6e1adc';
}