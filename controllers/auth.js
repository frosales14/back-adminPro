const { response } = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usurios');
const { generarJWT } = require('../helpers/jwt');


const login = async ( req, res = response ) => {

    const {email, password} = req.body;

    try {
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No Se Encontro Un Usuario Con Ese Email'
            });
        } 
        
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password No Valida'
            });
        }

        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok:true,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Algo salio mal'
        });
    }

    
    
}

module.exports = {
    login
}