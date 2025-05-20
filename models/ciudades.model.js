const { Schema, model } = require('mongoose');

const CiudadSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    pais: {
        type: Schema.Types.ObjectId,
        ref: 'Pais',
        required: true
    }
});

module.exports = model('Ciudad', CiudadSchema);