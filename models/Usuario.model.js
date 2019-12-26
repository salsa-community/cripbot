const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    rfc: { type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    primer_apellido: { type: String, required: true, max: 100, alias: 'primerApellido' },
    segundo_apellido: { type: String, required: true, max: 100, alias: 'segundoApellido' }
});


// Export the model
module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuarios');