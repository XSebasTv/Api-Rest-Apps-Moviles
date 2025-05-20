const Famoso = require('../models/famosos.model');

// Crear un famoso
const crearFamoso = async (req, res) => {
    try {
        const { nombre, ciudad } = req.body;
        // Validar duplicado (nombre y ciudad, sin importar mayúsculas/minúsculas)
        const existe = await Famoso.findOne({
            nombre: { $regex: `^${nombre}$`, $options: 'i' },
            ciudad
        });
        if (existe) {
            return res.status(400).json({ msg: 'Ya existe un famoso con ese nombre en esa ciudad' });
        }
        const famoso = new Famoso(req.body);
        await famoso.save();
        res.status(201).json(famoso);
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear famoso', error: error.message });
    }
};

// Obtener todos los famosos
const obtenerFamosos = async (req, res) => {
    try {
        // Popula ciudad y país de la ciudad
        const famosos = await Famoso.find()
            .populate({
                path: 'ciudad',
                populate: { path: 'pais', select: 'nombre codigo continente' }
            });
        res.json(famosos);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener famosos', error: error.message });
    }
};

// Obtener un famoso por ID
const obtenerFamoso = async (req, res) => {
    try {
        const { id } = req.params;
        const famoso = await Famoso.findById(id)
            .populate({
                path: 'ciudad',
                populate: { path: 'pais', select: 'nombre codigo continente' }
            });
        if (!famoso) {
            return res.status(404).json({ msg: 'Famoso no encontrado' });
        }
        res.json(famoso);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener famoso', error: error.message });
    }
};

// Actualizar un famoso
const actualizarFamoso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, ciudad } = req.body;
        // Validar duplicado si se cambia el nombre o ciudad
        if (nombre && ciudad) {
            const existe = await Famoso.findOne({
                _id: { $ne: id },
                nombre: { $regex: `^${nombre}$`, $options: 'i' },
                ciudad
            });
            if (existe) {
                return res.status(400).json({ msg: 'Ya existe un famoso con ese nombre en esa ciudad' });
            }
        }
        const famosoActualizado = await Famoso.findByIdAndUpdate(id, req.body, { new: true });
        if (!famosoActualizado) {
            return res.status(404).json({ msg: 'Famoso no encontrado' });
        }
        res.json(famosoActualizado);
    } catch (error) {
        res.status(400).json({ msg: 'Error al actualizar famoso', error: error.message });
    }
};

// Eliminar un famoso
const eliminarFamoso = async (req, res) => {
    try {
        const { id } = req.params;
        const famosoEliminado = await Famoso.findByIdAndDelete(id);
        if (!famosoEliminado) {
            return res.status(404).json({ msg: 'Famoso no encontrado' });
        }
        res.json({ msg: 'Famoso eliminado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar famoso', error: error.message });
    }
};

module.exports = {
    crearFamoso,
    obtenerFamosos,
    obtenerFamoso,
    actualizarFamoso,
    eliminarFamoso
};