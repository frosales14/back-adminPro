const jwt = require('jsonwebtoken');


const validarJwt = (req, res, next) => {


    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No Hay Token en la peticion'
        });
    }


    try {
        
        const { uid } = jwt.verify( token, process.env.TOKEN_SECRET );
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token No Valido'
        });
    }
}


module.exports = {
    validarJwt,
}