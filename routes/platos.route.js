const { Router } = require('express');
const { 
    crearPlato, 
    obtenerPlatos, 
    obtenerPlato, 
    actualizarPlato, 
    eliminarPlato 
} = require('../controllers/platos.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', validarJWT, crearPlato);
router.get('/', validarJWT, obtenerPlatos);
router.get('/:id', validarJWT, obtenerPlato);
router.put('/:id', validarJWT, actualizarPlato);
router.delete('/:id', validarJWT, eliminarPlato);

module.exports = router;