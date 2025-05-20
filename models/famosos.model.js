const { Schema, model } = require('mongoose');

const FamosoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    biografia: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    ciudad: { // Relación con ciudad de nacimiento
        type: Schema.Types.ObjectId,
        ref: 'Ciudad',
        required: true
    },
    tipoFama: { // Deportista, Actor, Político, etc.
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    obras: [{
        type: String
    }]
});

module.exports = model('Famoso', FamosoSchema);