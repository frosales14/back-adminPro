
require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config')


const app = express();

//configurar CORS
app.use(cors());

//base de datos
dbConnection();

app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola A TODOS'
    });

});

app.listen( process.env.PORT , () => {
    console.log('Seridor corriendo en el puerto '+ process.env.PORT);
})