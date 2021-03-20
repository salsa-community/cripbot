// i18n
const path = require('path')
const i18n = require('i18n')

i18n.configure({
    locales: ['es', 'en'],
    directory: path.join(__dirname, '..', 'locales')
})

/**
 * Get language
 */
exports.i18n = function (key, lang) {
    return i18n.__({ phrase: key, locale: lang });
}