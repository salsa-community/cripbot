/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { Sequelize } = require('sequelize');

const UsuarioModel = require('../../models/Usuario.model')


var Usuario = require('../../sequelize')
var Error = require('../../models/Error.model')
const { RFC_DIALOG_ID } = require('./util/constants')
const { BotkitConversation } = require('botkit')
const { resolveCodigo, resolveOptions, resolvePageNumber } = require('../../util/commons')
const RFC_ASK = 'Por favor, ingrese el RFC del receptor de la factura'

module.exports = function (controller) {
    let convo = new BotkitConversation(RFC_DIALOG_ID, controller);
    /**
     * GET RFC THREAD
     */
    convo.addAction('get-rfc-thread')
    convo.addQuestion(RFC_ASK, async (res, convo, bot) => {
        let db_host = process.env.MYSQL_HOST || 'localhost';
        let db_database = process.env.MYSQL_DB || 'becovtig';
        let db_username = process.env.MYSQL_USERNAME || 'becovtiguser';
        let db_password = process.env.MYSQL_PASSWORD || '5g#k@&k2p';

        const sequelize = new Sequelize(db_database, db_username, db_password, {
            host: db_host,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });

        // Test mysql connection
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection to Vtiger has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        const Usuario = UsuarioModel(sequelize, Sequelize)

        var usuario = await Usuario.findOne({ where: { siccode: res.trim() }, attributes: ['siccode', 'accountname'] });
        // var usuario = await Usuario.findOne({ rfc: res.trim() })
        if (usuario) {
            bot.say({ text: 'Bienvenido(a) ' + usuario.accountname })
            await convo.gotoThread('codigo-error-thread')
        } else {
            bot.say({ text: 'el RFC que me proporcionó no se encuentra en nuestra lista de clientes' })
            await convo.gotoThread('ask-user-info-thread')
        }
    }, 'rfc', 'get-rfc-thread')

    /**
     * CODIGO ERROR THREAD
     */
    convo.addAction('codigo-error-thread')
    convo.addQuestion({
        text: '<b>Ingrese el código de error que se está presentando o consulte alguna de nuestras siguientes secciones:</b>',
        quick_replies: async (template, vars) => {
            vars.optionPage = resolvePageNumber(vars.optionPage);
            return resolveOptions(vars.optionPage)
        }
    }, async (res, convo, bot) => {
        var error = await Error.findOne({ clave: resolveCodigo(res) });
        if (error) {
            bot.say({ text: error.desc });
            bot.say({ text: error.instrucciones.desc });
            convo.setVar('error', error);
            convo.setVar('currentStep', error.instrucciones.pasos[0]);
            convo.setVar('currentStepIdx', 0);
            convo.setVar('maxStepIdx', error.instrucciones.pasos.length);
            await convo.gotoThread('show-steps-thread');
        } else {
            bot.say({ text: 'el código de error ingresado no se encuentra en nuestra base de conocimiento' });
            await convo.gotoThread('codigo-error-thread');
        }
    }, 'codigo-error', 'codigo-error-thread');

    /**
     * SHOW STEPS THREAD
     */
    convo.addAction('show-steps-thread');
    convo.addQuestion({
        text: 'Paso {{vars.currentStep.paso}} : {{vars.currentStep.desc}}',
        quick_replies: [{ title: 'Realizado', payload: 'Realizado' }]
    }, async (res, convo, bot) => {
        if (convo.vars.currentStepIdx < convo.vars.maxStepIdx - 1) {
            convo.vars.currentStep = convo.vars.error.instrucciones.pasos[++convo.vars.currentStepIdx];
            await convo.gotoThread('show-steps-thread');
        } else {
            await convo.gotoThread('more-info-thread');
        }
    }, 'step-answer', 'show-steps-thread');

    /**
     * ASK for more information
     */

    convo.addAction('more-info-thread');
    convo.addQuestion({
        text: '¿Te gustaría ingresar otro código de error?',
        quick_replies: [{ title: 'No', payload: 'no' }, { title: 'Si', payload: 'si' }]
    }, [{
        pattern: 'no',
        handler: async (response, convo, bot) => {
            await convo.gotoThread('exit-thread');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            await convo.gotoThread('codigo-error-thread');
        }
    }], 'more-info-answer', 'more-info-thread');

    /**
     * Preguntar por información del usuario
     */

    convo.addAction('ask-user-info-thread');
    convo.addQuestion({
        text: '¿Te gustaría dejarnos tus datos?',
        quick_replies: [{ title: 'No', payload: 'no' }, { title: 'Si', payload: 'si' }]
    }, [{
        pattern: 'no',
        handler: async (response, convo, bot) => {
            await convo.gotoThread('exit-thread');
        }
    },
    {
        default: true,
        handler: async (response, convo, bot) => {
            await convo.gotoThread('codigo-error-thread');
        }
    }], 'ask-user-info-answer', 'ask-user-info-thread');


    convo.addAction('exit-thread');
    convo.addMessage('Fue un placer ayudarle, estaré aquí si me requiere', 'exit-thread');
    controller.addDialog(convo);
    controller.hears('rfc-dialog', 'message', async (bot, message) => {
        await bot.beginDialog(RFC_DIALOG_ID);
    });
}