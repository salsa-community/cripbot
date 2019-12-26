const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    rfc: { type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 100 },
    primerApellido: { type: String, required: true, max: 100 },
    segundoApellido: { type: String, required: true, max: 100 }
});


// Export the model
module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuarios');