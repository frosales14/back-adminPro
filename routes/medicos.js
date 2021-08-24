const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJwt } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    eliminarMedicos
} = require('../controllers/medicos');

const router = Router();

router.get('/', [], getMedicos);

router.post('/',
    [
        validarJwt,
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('hospital','El id de hospital debe de ser valido').isMongoId(),
        validarCampos
    ], 
    crearMedicos
);

router.put('/:id', 
    [
        validarJwt,
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('hospital','El hospital es requerido').isMongoId(),
        validarCampos
    ], 
    actualizarMedicos
);

router.delete('/:id', 
    [
        validarJwt,
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('hospital','El hospital es requerido').isMongoId(),
        validarCampos
    ], 
    eliminarMedicos
);

module.exports = router;