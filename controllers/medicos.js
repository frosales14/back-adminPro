const { response } = require('express');

const Medico = require('../models/medicos');

const getMedicos = async (req, res) => {
    
    const medicos = await Medico.find()
        .populate( 'usuario','nombre')
        .populate( 'hospital', 'nombre');

    res.json({
        ok:true,
        medicos
    });
}
const crearMedicos = async (req, res) => {
    
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ... req.body
    });

    try {

        medicoDB = await medico.save();

        res.json({
            ok:true,
            medico: medicoDB
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }

}
const actualizarMedicos = (req, res) => {
    res.json({
        ok:true,
        msg: 'actualizarMedicos'
    });
}
const eliminarMedicos = (req, res) => {
    res.json({
        ok:true,
        msg: 'eliminarMedicos'
    });
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    eliminarMedicos
}