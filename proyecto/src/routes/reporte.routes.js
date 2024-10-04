const express = require('express');
const { reporteController } = require('../controllers/pedido.controller');
const router = express.Router();

router.get("/", reporteController);

module.exports = router;