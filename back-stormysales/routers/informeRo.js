const express = require('express');
const { getVentas } = require('../controllers/Mod_Informes/ventasController');
const router = express.Router();

// Ruta para obtener informes de ventas por vendedor
router.get('/ventas', getVentas);

module.exports = router;
