const Visita = require('../models/visita.model');

// Crear una visita
const crearVisita = async (req, res) => {
    try {
        const { usuario, sitio, fecha_visita } = req.body;
        // Validar duplicado (opcional: mismo usuario, sitio y fecha)
        const existe = await Visita.findOne({ usuario, sitio, fecha_visita });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe una visita registrada para ese usuario, sitio y fecha' });
        }
        const visita = new Visita(req.body);
        await visita.save();
        res.status(201).json(visita);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las visitas
const obtenerVisitas = async (req, res) => {
    try {
        const visitas = await Visita.find().populate('usuario sitio');
        res.status(200).json(visitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una visita por ID
const obtenerVisita = async (req, res) => {
    try {
        const visita = await Visita.findById(req.params.id).populate('usuario sitio');
        if (!visita) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.status(200).json(visita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una visita por ID
const actualizarVisita = async (req, res) => {
    try {
        const { usuario, sitio, fecha_visita } = req.body;
        const { id } = req.params;
        // Validar duplicado si se cambia usuario, sitio o fecha
        if (usuario && sitio && fecha_visita) {
            const existe = await Visita.findOne({
                _id: { $ne: id },
                usuario,
                sitio,
                fecha_visita
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe una visita registrada para ese usuario, sitio y fecha' });
            }
        }
        const visita = await Visita.findByIdAndUpdate(id, req.body, { new: true });
        if (!visita) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.status(200).json(visita);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una visita por ID
const eliminarVisita = async (req, res) => {
    try {
        const visita = await Visita.findByIdAndDelete(req.params.id);
        if (!visita) {
            return res.status(404).json({ message: 'Visita no encontrada' });
        }
        res.json({ message: 'Visita eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearVisita,
    obtenerVisitas,
    obtenerVisita,
    actualizarVisita,
    eliminarVisita
};