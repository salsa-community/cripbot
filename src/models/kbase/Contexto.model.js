const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContextoSchema = new Schema({
    nombre: { type: String },
    clave: { type: String },
    desc: { type: String },
    descEn: { type: String },
});

module.exports = mongoose.model('Contexto', ContextoSchema, 'contexto');