const express = require('express');
const { crearBodegaController, listarBodegasController, eliminarBodegaController } = require('../controllers/bodega.controller');
const router = express.Router();

router.post("/", crearBodegaController);
router.get("/", listarBodegasController);
router.delete("/:codigo", eliminarBodegaController);

module.exports = router;