const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();

const clientRoutes = require('./routes/client.routes');
const productoRoutes = require('./routes/producto.routes');
const bodegaRouter = require('./routes/bodega.routes');
const cuartoFrioController = require('./routes/cuartosFrios.routes');
const carritoRouter = require('./routes/carrito.routes');
const pedidosRouter = require('./routes/pedido.routes');
const reporteRouter = require('./routes/reporte.routes');
const app = express();
const port = 3000;


// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use("/clientes", clientRoutes);
app.use("/productos", productoRoutes);
app.use("/bodegas", bodegaRouter);
app.use("/cuartos_frios", cuartoFrioController);
app.use("/carrito", carritoRouter);
app.use("/pedidos", pedidosRouter);
app.use("/reporte_cliente", reporteRouter);

// Inicia el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
