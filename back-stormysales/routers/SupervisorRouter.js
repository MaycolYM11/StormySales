const express = require('express');
const datosController = require('../controllers/usuarios/supervisorControllers');
const rutaDatos = express.Router();

rutaDatos.get('/getsupervisor',datosController.busquedaSupervisor);

rutaDatos.post('/postsupervisor',datosController.crearSupervisor);

module.exports = rutaDatos;