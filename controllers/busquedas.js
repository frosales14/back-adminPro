
const {response} = require('express');

const Usuario   = require('../models/usurios');
const Medico    = require('../models/medicos');
const Hospital  = require('../models/hospital');


const getTodo = async (req, res=response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentsCollection = async (req, res=response) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch( tabla ){

        case 'usuarios':
            data = await Usuario.find({nombre: regex})
        break;
            
        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                .populate('usuario', 'nombre img')
        break;

        case 'medicos':
            data = await Medicos.find({nombre: regex})
                .populate( 'usuario', 'nombre img' )
                .populate( 'hospital', 'nombre img');
        break;

        default: 
            res.status(400).json({
                ok: false,
                msg: 'La tabla tabla tiene que ser usuarios/hospitales/medicos'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentsCollection
}