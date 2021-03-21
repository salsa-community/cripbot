const { i18n } = require('@util/lang');

exports.infoQuickReplies = function (lang) {
    return [
        {
            title: i18n('answer.yes', lang),
            payload: 'rfc-dialogo'
        },
    ]
}

exports.menuQuickReplies = [
    {
        title: 'Código de Errores',
        payload: 'rfc-dialogo'
    },
]

exports.helpQuickReplies = [
    {
        title: 'Código de Errores',
        payload: 'rfc-dialogo'
    },
    {
        title: 'Cuenta con un código CFDI',
        payload: 'codigo-cfdi'
    }, {
        title: 'Seguimiento a un ticket',
        payload: 'ticket'
    }, {
        title: 'Crear un ticket',
        payload: 'crear-ticket'
    },
]

exports.solicitudesGenerales = [
    {
        title: 'SOLICITUD DE ACUSES DE RECIBO',
        payload: 'SOLACUSE'
    },
    {
        title: 'SOLICITUD DE ESTATUS DE ACUSES DE RECIBO',
        payload: 'SOLESTATUS'
    },
    {
        title: 'RECUPERACIÓN DE TRACKID',
        payload: 'SOLTRACKID'
    },
    {
        title: 'RECUPERACIÓN DE TRACKID',
        payload: 'SOLTRACKID-A'
    },
    {
        title: 'AGREGAR ARCHIVOS ANEXOS A RED COFIDI (PDF)',
        payload: 'SOLARCHIVOS'
    },
    {
        title: 'ERROR EN CODIFICACIÓN UTF-8',
        payload: 'SOLCODIFICACION'
    },
    {
        title: 'ERROR EN LÍNEAS OC U OP',
        payload: 'SOLERROR'
    },
    {
        title: 'ERROR EN RFC / NO ES INTEGRANTE DE LA RED COFIDI',
        payload: 'SOLRFC'
    },
    {
        title: 'CONSULTA DE MANUALES DE APOYO',
        payload: 'SOLMANUALES'
    }
]