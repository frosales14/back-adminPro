
require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config')


const app = express();

//configurar CORS
app.use(cors());
app.use(express.json());

//base de datos
dbConnection();

//rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use('/api/login', require('./routes/auth') );

app.listen( process.env.PORT , () => {
    console.log('Seridor corriendo en el puerto '+ process.env.PORT);
})