const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ContactoSchema = new Schema({
    context: { type: String },
    correo: { type: String, required: true, max: 500 },
    rfc: { type: String, required: false, max: 500 },
    estado: { type: String, required: true, max: 500 },
    desc: { type: String, required: false, max: 500 },
    last_modified: { type: Date, default: Date.now, alias: 'lastModified' }
});

module.exports = mongoose.model('Contacto', ContactoSchema, 'contactos');