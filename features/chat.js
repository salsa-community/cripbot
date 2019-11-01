/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const express = require('express');
const path = require('path');

module.exports = function (controller) {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    controller.on('hello', firstTime);
    controller.on('welcome_back', firstTime);

    function firstTime(bot, message) {
        var personal = ['Lucía', 'Paula', 'María', 'Isabella', 'Jimena', 'Sara', 'Laura'];
        bot.say({
            text: 'Hola! ¿Cómo estás?'
        }
        );
        bot.say({
            text: 'Bienvenido a ATEB'
        }
        );
        bot.say({
            text: 'Mi nombre es ' + personal[getRandomInt(0, 6)]
        }
        );
        bot.reply(message, {
            text: '¿Te gustaría ver información sobre nosotros?!',
            quick_replies: [
                {
                    title: 'solicitar Información',
                    payload: 'rfc'
                },
            ]
        }, function () { });

    }
}