const Sitio = require('../models/sitios.model');

// Crear un sitio
const crearSitio = async (req, res) => {
    try {
        const { nombre, ciudad } = req.body;
        // Validar duplicado (nombre y ciudad, sin importar mayúsculas/minúsculas)
        const existe = await Sitio.findOne({
            nombre: { $regex: `^${nombre}$`, $options: 'i' },
            ciudad
        });
        if (existe) {
            return res.status(400).json({ message: 'Ya existe un sitio con ese nombre en esa ciudad' });
        }
        const sitio = new Sitio(req.body);
        await sitio.save();
        res.status(201).json(sitio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los sitios
const obtenerSitios = async (req, res) => {
    try {
        const sitios = await Sitio.find();
        res.status(200).json(sitios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un sitio por ID
const obtenerSitio = async (req, res) => {
    try {
        const sitio = await Sitio.findById(req.params.id);
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio no encontrado' });
        }
        res.status(200).json(sitio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un sitio por ID
const actualizarSitio = async (req, res) => {
    try {
        const { nombre, ciudad } = req.body;
        const { id } = req.params;
        // Validar duplicado si se cambia el nombre o ciudad
        if (nombre && ciudad) {
            const existe = await Sitio.findOne({
                _id: { $ne: id },
                nombre: { $regex: `^${nombre}$`, $options: 'i' },
                ciudad
            });
            if (existe) {
                return res.status(400).json({ message: 'Ya existe un sitio con ese nombre en esa ciudad' });
            }
        }
        const sitio = await Sitio.findByIdAndUpdate(id, req.body, { new: true });
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio no encontrado' });
        }
        res.status(200).json(sitio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un sitio por ID
const eliminarSitio = async (req, res) => {
    try {
        const sitio = await Sitio.findByIdAndDelete(req.params.id);
        if (!sitio) {
            return res.status(404).json({ message: 'Sitio no encontrado' });
        }
        res.json({ message: 'Sitio eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearSitio,
    obtenerSitios,
    obtenerSitio,
    actualizarSitio,
    eliminarSitio
};