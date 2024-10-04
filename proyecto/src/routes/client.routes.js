const express = require('express');
const { listClientsController, createClientController } = require('../controllers/client.controller');

const router = express.Router();

router.get("/", listClientsController);
router.get("/:codigo", listClientsController);
router.post("/", createClientController);

module.exports = router;