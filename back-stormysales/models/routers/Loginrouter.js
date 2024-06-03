const express = require('express');
const datacontroller =  require('../controllers/Login/loginControllers');
const rutaDatos = express.Router();


rutaDatos.post('/autenticar', datacontroller.autenticarIngreso);


module.exports = rutaDatos;