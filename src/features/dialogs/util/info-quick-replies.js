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
        },
        {
            title: i18n('help.cfdi', lang),
            payload: 'codigo-cfdi'
        },
        {
            title: i18n('help.seguimiento-ticket', lang),
            payload: 'ticket'
        }, {
            title: i18n('help.crear-ticket', lang),
            payload: 'crear-ticket'
        },
    ]
}

exports.solicitudesGenerales = function (lang) {
    return [
        {
            title: i18n('solicitudes.acuse', lang),
            payload: 'SOLACUSE'
        },
        {
            title: i18n('solicitudes.estado', lang),
            payload: 'SOLESTATUS'
        },
        {
            title: i18n('solicitudes.recuperacion', lang),
            payload: 'SOLTRACKID'
        },
        {
            title: i18n('solicitudes.recuperacion', lang),
            payload: 'SOLTRACKID-A'
        },
        {
            title: i18n('solicitudes.archivos', lang),
            payload: 'SOLARCHIVOS'
        },
        {
            title: i18n('solicitudes.error-codificacion', lang),
            payload: 'SOLCODIFICACION'
        },
        {
            title: i18n('solicitudes.error-lineas', lang),
            payload: 'SOLERROR'
        },
        {
            title: i18n('solicitudes.error-rfc', lang),
            payload: 'SOLRFC'
        },
        {
            title: i18n('solicitudes.manual', lang),
            payload: 'SOLMANUALES'
        }
    ]
}
