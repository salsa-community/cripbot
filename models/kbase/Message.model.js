const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MessageSchema = new Schema({
    user: { type: String },
    text: { type: String },
    type: { type: String },
    quick_replies: [{ title: String, payload: String }],
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema, 'messages');