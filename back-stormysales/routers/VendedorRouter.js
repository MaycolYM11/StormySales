const express = require('express');
const datosController = require('../controllers/usuarios/vendedorControllers');
const rutaDatos = express.Router();

rutaDatos.get('/getvendedores',datosController.mostrarVendedor);

rutaDatos.post('/postvendedor',datosController.crearVendedor)

module.exports = rutaDatos;