

const {Router} = require('express');

const {getTodo, getDocumentsCollection} = require('../controllers/busquedas');

const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:busqueda', 
    [
        validarJwt
    ],
    getTodo
);

router.get('/coleccion/:tabla/:busqueda',validarJwt, getDocumentsCollection);


module.exports = router;