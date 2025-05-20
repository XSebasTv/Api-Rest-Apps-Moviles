const { Schema, model } = require('mongoose');

const PaisSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    continente: {
        type: String,
        required: true
    }
});

module.exports = model('Pais', PaisSchema);