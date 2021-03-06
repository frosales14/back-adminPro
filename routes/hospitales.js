/*
    '/api/hospitales'
*/ 

const { Router } = require('express');

const { check } = require('express-validator');

const { validarJwt } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    eliminarHospitales,
} = require('../controllers/hospitales');

const router = Router();

router.get( '/', getHospitales );

router.post( '/',
    [
        validarJwt,
        check('nombre').not().isEmpty(),
        validarCampos
    ],
    crearHospitales 
);

router.put( '/:id', 
    [
        validarJwt,
        check('nombre').not().isEmpty(),
        validarCampos
    ],
    actualizarHospitales
);

router.delete('/:id', validarJwt ,eliminarHospitales);

module.exports = router;