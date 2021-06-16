/**
 * Resolve the font size
 */
exports.resolveColor = function (req) {
    return typeof req.query.color === 'undefined' ? '072146' : req.query.color;
}

/**
 * Resolve the font size
 */
exports.resolveFontSize = function (req) {
    return typeof req.query.font_size === 'undefined' ? '1em' : req.query.font_size;
}

exports.resolveLang = function (req) {
    return typeof req.query.culture === 'undefined' ? undefined : req.query.culture.split(/-|_/)[0];
}

exports.resolveAvatar = function (req) {
    let avatar = {};
    avatar.width = typeof req.query.avatar_width === 'undefined' ? '60px' : req.query.avatar_width;
    avatar.left = typeof req.query.avatar_left === 'undefined' ? '1px' : req.query.avatar_left;
    avatar.top = typeof req.query.avatar_top === 'undefined' ? '-8px' : req.query.avatar_top;
    avatar.name = typeof req.query.avatar === 'undefined' ? 'random' : req.query.avatar;
    avatar.extension = avatar.name === 'cripbot' ? 'gif' : 'png';
    return avatar;

}