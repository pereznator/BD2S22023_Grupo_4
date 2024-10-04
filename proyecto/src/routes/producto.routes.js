const express = require('express');
const { crearProductoController, listarProductosController, eliminarProductoController, actualizarProductoController } = require('../controllers/producto.controller');
const router = express.Router();

router.post("/", crearProductoController);
router.get("/", listarProductosController);
router.delete("/:codigo", eliminarProductoController);
router.put("/:codigo", actualizarProductoController);

module.exports = router;