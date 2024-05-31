/*
    * Router del Modúlo de Facturación
*/

const express = require('express');
const controladorFactura = require('../../controllers/mod_facturacion/facturacion_controller')
const controladorUsuarioFactura = require('../../controllers/mod_facturacion/clienteFactura_Controller')
const rutaFactura = express.Router();

rutaFactura.get('/getlastfacturaid', controladorFactura.GET_LAST_FACTURA_ID);
rutaFactura.get('/getallfacturas', controladorFactura.GET_ALL_FACTURAS);
rutaFactura.get('/getallfacturasdetalles', controladorFactura.GET_ALL_FACTURAS_DETALLE);
rutaFactura.get('/getidfacturasdetalles/:id', controladorFactura.GET_ID_FACTURAS_DETALLE);

rutaFactura.post('/insertfactura', controladorFactura.INSERT_FACTURA_CON_DETALLES);
rutaFactura.put('/updatefactura/:id', controladorFactura.ACTUALIZAR_FACTURA);

rutaFactura.delete('/deletefactura/:id', controladorFactura.ELIMINAR_FACTURA);
rutaFactura.put('/inactivatefactura/:id', controladorFactura.CAMBIAR_ESTADO_FACTURA);

// Usuarios
rutaFactura.get('/getclientesactivos', controladorUsuarioFactura.GET_CLIENTES_ACTIVOS);
rutaFactura.get('/getclienteactivo', controladorUsuarioFactura.GET_CLIENTE_ACTIVO);


module.exports = rutaFactura