const express = require("express");
const zonaController = require("../controllers/Mod_zonas/zonasController");
const rutaZona = express.Router();

rutaZona.get("/rutas", zonaController.obtenerZonas);

rutaZona.get("/rutas/:id", zonaController.obtenerZonaPorId);

rutaZona.post("/createzona", zonaController.CreateZona);

rutaZona.post('/createzonadetail',zonaController.CreateDetalleZona);

rutaZona.put("/updatezona/:id", zonaController.UpdateZona);
rutaZona.put("/createzona/:id", zonaController.UpdateDetalleZona);

rutaZona.get("/obclientes", zonaController.obtenerClientes);
// rutaZona.delete("/rutas/:id", zonaController.eliminarZona);

rutaZona.put("/cambioestadorutas/:id", zonaController.cambioEstadoZona);

rutaZona.get("/usuariosrol2", zonaController.obtenerUsuariosRol2);
// rutaZona.post("/verificar-telefono", zonaController.verificarTelefonoExistente);

module.exports = rutaZona;