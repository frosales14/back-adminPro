
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

const actualizarHospitales = async (req, res = response) => {
    
    const id = req.params.id;

    try {
    
        const hospital = await Hospital.findById( id );
        
        if( !hospital ){
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro un hospital con ese id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: req.uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true} );

        return res.json({
            ok: true,
            hospitalActualizado
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

const eliminarHospitales = async ( req, res = response ) => {
    const id = req.params.id;

    try {
    
        const hospital = await Hospital.findById( id );
        
        if( !hospital ){
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro un hospital con ese id'
            });
        }

        await Hospital.findByIdAndDelete( id );

        return res.json({
            ok: true,
            msg: 'Eliminado exitosamente'
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    eliminarHospitales,
}