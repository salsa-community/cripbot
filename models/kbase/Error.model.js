const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ErrorSchema = new Schema({
    clave: { type: String, required: true, max: 100 },
    desc: { type: String, required: true, max: 1000 },
    descEn: { type: String, required: true, max: 1000 },
    instrucciones: { desc: { type: String, required: true, max: 1000 }, descEn: { type: String, required: true, max: 1000 }, pasos: [{ paso: Number, desc: String, descEn: String }] },
    links: [{ url: String }],
    contextos: [String]
});

module.exports = mongoose.model('Error', ErrorSchema, 'errores');