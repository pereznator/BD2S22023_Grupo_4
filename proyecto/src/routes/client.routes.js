const express = require('express');
const { listClientsController, createClientController, actualizarClienteController } = require('../controllers/client.controller');

const router = express.Router();

router.get("/", listClientsController);
router.get("/:codigo", listClientsController);
router.put("/:codigo", actualizarClienteController);
router.post("/", createClientController);

module.exports = router;