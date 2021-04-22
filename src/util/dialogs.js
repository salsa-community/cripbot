/**
 * Get a greeting base on the current hour
 */
exports.resolveSaludo = function () {
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
        return 'Buenos dias';
    } else if (curHr < 18) {
        return 'Buena tarde';
    } else {
        return 'Buena noche';
    }
}