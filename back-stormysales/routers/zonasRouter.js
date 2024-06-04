const express = require("express");
const zonaController = require("../controllers/Mod_zonas/zonasController");
const rutaZona = express.Router();

rutaZona.get("/rutas", zonaController.obtenerZonas);

rutaZona.get("/rutas/:id", zonaController.obtenerZonaPorId);

rutaZona.post("/createzona", zonaController.CreateZona);

rutaZona.post('/createzonadetail',zonaController.CreateDetalleZona);

rutaZona.put("/updatezona/:id", zonaController.UpdateZona);
rutaZona.put("/updatezonaDetalle/:id", zonaController.UpdateDetalleZona);
rutaZona.get("/detalleZona/:id", zonaController.DetalleZona);


rutaZona.get('/validarClienteEnZona/:idZona/:idCliente', zonaController.validarClienteEnZona);

rutaZona.get("/obclientes", zonaController.obtenerClientes);

rutaZona.get('/rutaInfo/:idRuta', zonaController.obtenerInfoRuta);

rutaZona.put("/cambioestadorutas/:id", zonaController.cambioEstadoZona);

rutaZona.get("/usuariosrol2", zonaController.obtenerUsuariosRol2);

rutaZona.delete("/elininarcliente/:id", zonaController.clienteElim);


rutaZona.get('/clientesConDetalle/:idZona', zonaController.obtenerClientesConDetalleZona);

module.exports = rutaZona;