const { response } = require('express');

const bcrypt = require('bcryptjs');
const Usuario = require('../models/usurios');

const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {

        const {name, email, picture} = await googleVerify(googleToken);
        
        const usuarioDb = await Usuario.findOne({email});

        let usuario;

        if(!usuarioDb){
                usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            usuario = usuarioDb;
            usuario.google = true;
            usuario.password = '@@@';
        }

        await usuario.save();

        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            name, 
            email, 
            picture,
            token
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Token no valido'
        });

    }


}

const renewToken = async (req, res=response) => {

    const uid = req.uid;

    const token = await generarJWT( uid );

    res.json({
        ok: true,
        token
    })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}