const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var DBRef = mongoose.SchemaTypes.DBRef;

let ActividadSchema = new Schema({
    contexto: { type: String },
    valor: { type: String },
    desc: { type: String },
    evento: { type: String },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Actividad', ActividadSchema, 'actividades');