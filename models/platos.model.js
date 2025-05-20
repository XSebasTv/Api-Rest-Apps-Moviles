const { Schema, model } = require('mongoose');

const PlatoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Plato', PlatoSchema);