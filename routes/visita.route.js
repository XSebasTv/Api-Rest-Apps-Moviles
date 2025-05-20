const { Router } = require('express');
const { 
    crearVisita, 
    obtenerVisitas, 
    obtenerVisita, 
    actualizarVisita, 
    eliminarVisita 
} = require('../controllers/visita.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');
const Visita = require('../models/visita.model');
const Ciudad = require('../models/ciudades.model');
const Sitio = require('../models/sitios.model');
const Pais = require('../models/paises.model');
const Plato = require('../models/platos.model');
const Usuario = require('../models/mongoUsuario.model');

const router = Router();

router.post('/', validarJWT, crearVisita);
router.get('/', validarJWT, obtenerVisitas);
router.get('/:id', validarJWT, obtenerVisita);
router.put('/:id', validarJWT, actualizarVisita);
router.delete('/:id', validarJWT, eliminarVisita);

const topSitiosPorPais = async (req, res) => {
    try {
        const { paisId } = req.params;
        // Busca ciudades del país
        const ciudades = await Ciudad.find({ pais: paisId }).select('_id');
        const ciudadIds = ciudades.map(c => c._id);
        // Busca sitios en esas ciudades
        const sitios = await Sitio.find({ ciudad: { $in: ciudadIds } }).select('_id nombre');
        const sitioIds = sitios.map(s => s._id);
        // Aggregate visitas
        const top = await Visita.aggregate([
            { $match: { sitio: { $in: sitioIds } } },
            { $group: { _id: "$sitio", visitas: { $sum: 1 } } },
            { $sort: { visitas: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "sitios",
                    localField: "_id",
                    foreignField: "_id",
                    as: "sitio"
                }
            },
            { $unwind: "$sitio" }
        ]);
        res.json(top);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.get('/top10/:paisId', validarJWT, topSitiosPorPais);

const obtenerPlatosPorPais = async (req, res) => {
    try {
        const { paisId } = req.params;
        const platos = await Plato.find({ pais: paisId });
        res.json(platos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.get('/por-pais/:paisId', validarJWT, obtenerPlatosPorPais);

const obtenerFavoritos = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).populate('favoritos');
        res.json(usuario.favoritos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.get('/favoritos', validarJWT, obtenerFavoritos);

// Agregar favorito
router.post('/favoritos/:sitioId', validarJWT, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario.favoritos.includes(req.params.sitioId)) {
        usuario.favoritos.push(req.params.sitioId);
        await usuario.save();
    }
    res.json(usuario.favoritos);
});
// Quitar favorito
router.delete('/favoritos/:sitioId', validarJWT, async (req, res) => {
    const usuario = await Usuario.findById(req.usuario.id);
    usuario.favoritos = usuario.favoritos.filter(id => id.toString() !== req.params.sitioId);
    await usuario.save();
    res.json(usuario.favoritos);
});

module.exports = router;