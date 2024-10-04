const express = require('express');
const { crearPedidoController, obtenerPedidosPorClienteController } = require('../controllers/pedido.controller');
const router = express.Router();

router.post("/:codigo_cliente", crearPedidoController);
router.get("/:codigo_cliente", obtenerPedidosPorClienteController);

module.exports = router;