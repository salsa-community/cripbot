const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContextoSchema = new Schema({
    nombre: { type: String },
    clave: { type: String },
    desc: { type: String },
    descEn: { type: String },
    objetivo: { type: String },
    objetivoEn: { type: String },
    organizacion: { type: String },
    loginMessage: { type: String },
    loginMessageEn: { type: String },
    welcomeMessage: { type: String },
    welcomeMessageEn: { type: String },
});

module.exports = mongoose.model('Contexto', ContextoSchema, 'contexto');