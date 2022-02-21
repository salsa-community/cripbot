const { i18n } = require('@util/lang');

exports.menuQuickReplies = function (lang) {
    return [
        {
            title: i18n('help.menu', lang),
            payload: i18n('main.menu', lang)
        },
    ]
}
