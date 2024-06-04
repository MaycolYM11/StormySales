const express = require('express');
const datosController = require('../controllers/usuarios/clienteControllers');
const rutaDatos = express.Router();

rutaDatos.get('/mostrarclientes',datosController.busquedaCliente);

rutaDatos.get('/verifyidcliente/:id',datosController.verificarClienteID);

rutaDatos.post('/crearcliente',datosController.crearCliente);

rutaDatos.put('/actualizarcliente/:id',datosController.editarCliente);

rutaDatos.put('/cambiarestadocliente/:id',datosController.camibioEstadoCliente);

module.exports = rutaDatos;