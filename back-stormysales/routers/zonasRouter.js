const express = require("express");
const zonaController = require("../controllers/Mod_zonas/zonasController");
const rutaZona = express.Router();

rutaZona.get("/rutas", zonaController.obtenerZonas);

rutaZona.get("/rutas/:id", zonaController.obtenerZonaPorId);

rutaZona.post("/rutas", zonaController.crearZona);

rutaZona.put("/rutas/:id", zonaController.actualizarZona);

rutaZona.delete("/rutas/:id", zonaController.eliminarZona);

rutaZona.put("/cambioestadorutas/:id", zonaController.cambioEstadoZona);

// rutaZona.post("/verificar-telefono", zonaController.verificarTelefonoExistente);

module.exports = rutaZona;