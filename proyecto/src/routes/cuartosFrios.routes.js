const express = require('express');
const { crearCuartoFrioController, elminarCuartoFrioController } = require('../controllers/bodega.controller');
const router = express.Router();

router.post("/", crearCuartoFrioController);
router.delete("/:codigo_bodega/:codigo_cuarto_frio", elminarCuartoFrioController);

module.exports = router;