
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

app.use(express.static('public'));

//rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use('/api/hospitales', require('./routes/hospitales') );
app.use('/api/medicos', require('./routes/medicos') );
app.use('/api/todo', require('./routes/busquedas') );
app.use('/api/login', require('./routes/auth') );
app.use('/api/upload', require('./routes/upload') );


app.listen( process.env.PORT , () => {
    console.log('Seridor corriendo en el puerto '+ process.env.PORT);
})