const { Router } = require('express');
const { 
    crearCiudad, 
    obtenerCiudades, 
    obtenerCiudad, 
    actualizarCiudad, 
    eliminarCiudad 
} = require('../controllers/ciudades.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearCiudad);
router.get('/', validarJWT, obtenerCiudades);
router.get('/:id', validarJWT, obtenerCiudad);
router.put('/:id', validarJWT, actualizarCiudad);
router.delete('/:id', validarJWT, eliminarCiudad);

module.exports = router;