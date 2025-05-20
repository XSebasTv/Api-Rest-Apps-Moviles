const { Router } = require('express');
const { 
    crearSitio, 
    obtenerSitios, 
    obtenerSitio, 
    actualizarSitio, 
    eliminarSitio 
} = require('../controllers/sitios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.post('/', [validarJWT, esAdminRole], crearSitio);
router.get('/', validarJWT, obtenerSitios);
router.get('/:id', validarJWT, obtenerSitio);
router.put('/:id', validarJWT, actualizarSitio);
router.delete('/:id', validarJWT, eliminarSitio);

module.exports = router;