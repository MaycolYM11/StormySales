const express = require('express');
const AbonoController = require('../controllers/Abono/AbonoControllers');
const rutaDatos = express.Router();

rutaDatos.get('/BuscarFacturaCliente/:id_factura?/:id_cliente?', AbonoController.busquedaFacturaCliente);
rutaDatos.get('/AbonosDatos/:ID_factura_fk', AbonoController.AbonosDatos);

module.exports = rutaDatos;