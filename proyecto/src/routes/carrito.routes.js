const express = require('express');
const { crearItemCarritoController, listarItemsCarritoPorClienteController, actualizarItemCarritoController, eliminarItemCarritoController } = require('../controllers/carrito.controller');
const router = express.Router();

router.post("/", crearItemCarritoController);
router.put("/", actualizarItemCarritoController);
router.get("/:codigo_cliente", listarItemsCarritoPorClienteController);
router.delete("/:codigo_cliente/:codigo_producto", eliminarItemCarritoController);


module.exports = router;