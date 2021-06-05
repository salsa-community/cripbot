const { i18n } = require('@util/lang');

exports.infoQuickReplies = function (lang) {
    return [
        {
            title: i18n('answer.yes', lang),
            payload: 'pasos-dialog'
        },
    ]
}

exports.menuQuickReplies = function (lang) {
    return [
        {
            title: i18n('help.codigos', lang),
            payload: 'pasos-dialog'
        },
    ]
}

exports.helpQuickReplies = function (lang) {
    return [
        {
            title: i18n('help.codigos', lang),
            payload: 'pasos-dialog'
        }
    ]
}