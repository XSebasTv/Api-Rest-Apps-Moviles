const { Router } = require('express');
const { 
    crearFamoso, 
    obtenerFamosos, 
    obtenerFamoso, 
    actualizarFamoso, 
    eliminarFamoso 
} = require('../controllers/famosos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearFamoso);
router.get('/', validarJWT, obtenerFamosos);
router.get('/:id', validarJWT, obtenerFamoso);
router.put('/:id', validarJWT, actualizarFamoso);
router.delete('/:id', validarJWT, eliminarFamoso);

module.exports = router;