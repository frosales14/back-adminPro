
/*
    Path: '/api/login'
*/ 

const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();


router.post( '/',
    [
        check( 'email', 'El Email Es Obligatorio' ).isEmail(),
        check( 'password', 'El Password Es Obligatorio' ).not().isEmpty(),
        validarCampos
    ],
    login
);

router.post( '/google',
    [
        check( 'token', 'El token Es Obligatorio' ).not().isEmpty(),
        validarCampos
    ],
    googleSignIn
);

router.get('/renew', validarJwt, renewToken);

module.exports = router;