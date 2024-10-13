const express = require('express');
const { listClientsController, createClientController, actualizarClienteController, obtenerClientePorIdController } = require('../controllers/client.controller');

const router = express.Router();

router.get("/", listClientsController);
router.get("/:codigo", obtenerClientePorIdController);
router.put("/:codigo", actualizarClienteController);
router.post("/", createClientController);

module.exports = router;