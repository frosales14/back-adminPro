const { Router } = require('express');
const { getUsuarios, crearUsuarios, editarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarJwt ,getUsuarios );

router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuarios 
);

router.put( '/:id', 
    [
        validarJwt,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('role', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El role es Obligatorio').isEmail(),
        validarCampos
    ],
    editarUsuario 
);

router.delete('/:id', validarJwt, borrarUsuario);

module.exports = router;