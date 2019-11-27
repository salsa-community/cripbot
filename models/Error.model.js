const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ErrorSchema = new Schema({
    clave: { type: String, required: true, max: 100 },
    desc: { type: String, required: true, max: 100 },
    instrucciones: { desc: { type: String, required: true, max: 100 }, pasos: [{ paso: Number, desc: String }] },
    links: [{ url: String }]
});


// Export the model
module.exports = mongoose.model('Error', ErrorSchema, 'errores');