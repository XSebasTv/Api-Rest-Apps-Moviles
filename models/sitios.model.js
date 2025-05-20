const { Schema, model } = require('mongoose');

const SitioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    imagen: {
        type: String
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Sitio', SitioSchema);