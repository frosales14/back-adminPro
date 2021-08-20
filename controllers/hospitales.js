
const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {
    
    const hospitales = await Hospital.find()
        .populate( 'usuario', 'nombre img' ); 
    
    res.json({
        ok: true,
        hospitales
    });
}

const crearHospitales = async (req, res = response) => {
    
    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ... req.body
    } );

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospital: hospitalDB
        });

        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'contacte al administrador'
        });
    }
}

const actualizarHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    });
}

const eliminarHospitales = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'eliminarHospital'
    });
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    eliminarHospitales,
}