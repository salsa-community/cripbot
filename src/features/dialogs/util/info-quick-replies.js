const { i18n } = require('@util/lang');

exports.infoQuickReplies = function (lang) {
    return [
        {
            title: i18n('answer.yes', lang),
            payload: i18n('help.message', lang)
        },
    ]
}

exports.menuQuickReplies = function (lang) {
    return [
        {
            title: i18n('help.codigos', lang),
            payload: i18n('help.message', lang)
        },
    ]
}

exports.helpQuickReplies = function (lang) {
    return [
        {
            title: i18n('help.codigos', lang),
            payload: i18n('help.message', lang)
        }
    ]
}