const carritoService = require('../services/carrito.service');
const { clientService } = require('../services/client.service');
const productoService = require('../services/producto.service');
const pedidoService = require('../services/pedido.service');

const crearPedidoController = async (req, res) => {
  try {
    const { codigo_cliente } = req.params;

    if (!codigo_cliente) {
      return res.status(400).json({ message: 'El código del cliente es requerido.' });
    }

    const cliente = await clientService.obtenerClientePorId(codigo_cliente);
    if (!cliente) {
      return res.status(404).json({ message: 'El cliente no existe.' });
    }

    const itemsCarrito = await carritoService.listarItemsCarritoPorCliente(codigo_cliente);
    if (itemsCarrito.length === 0) {
      return res.status(400).json({ message: 'El carrito del cliente está vacío.' });
    }

    const tipo_cliente = cliente.tipo;

    let total_pedido = itemsCarrito.reduce((acc, item) => acc + item.subtotal, 0);
    let descuento_aplicado = 0;
    if (tipo_cliente === 'A') {
      descuento_aplicado = total_pedido * 0.1;
      total_pedido -= descuento_aplicado;
    } else if (tipo_cliente === 'B') {
      descuento_aplicado = total_pedido * 0.05;
      total_pedido -= descuento_aplicado;
    }

    const fecha_pedido = new Date();

    const detalles =  await Promise.all(itemsCarrito.map(async(item) => {
      const producto = await productoService.obtenerProductoPorId(item.codigo_producto);
      return {
        codigo_producto: item.codigo_producto,
        nombre_producto: item.nombre_producto,
        imagen: item.imagen,
        codigo_bodega: producto.codigo_bodega,
        codigo_cuarto_frio: producto.codigo_cuarto_frio,
        precio_unitario: item.precio_unitario,
        cantidad: item.cantidad,
        subtotal: item.subtotal
      };
    }));

    const pedidoId = await pedidoService.crearPedido({ codigo_cliente, fecha_pedido, total_pedido, descuento_aplicado, detalles, tipo_cliente });

    const pedido = await pedidoService.obtenerPedidoPorId(codigo_cliente, pedidoId);

    await carritoService.actualizarItemsCarritoOrdenados({ codigo_cliente });

    await pedidoService.crearPedidoPorClienteFecha({ codigo_cliente, fecha: fecha_pedido, pedido_id: pedidoId, descuento_aplicado, nombre_cliente: cliente.nombre, tipo_cliente, total: total_pedido });

    return res.status(201).json(pedido);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

const obtenerPedidosPorClienteController = async (req, res) => {
  try {
    const { codigo_cliente } = req.params;

    if (!codigo_cliente) {
      return res.status(400).json({ message: 'El código del cliente es requerido.' });
    }

    const cliente = await clientService.obtenerClientePorId(codigo_cliente);
    if (!cliente) {
      return res.status(404).json({ message: 'El cliente no existe.' });
    }

    const pedidos = await pedidoService.obtenerPedidosPorCliente(codigo_cliente);

    return res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

const reporteController = async (req, res) => {
  try {
    const { codigo_cliente, fecha_inicio, fecha_fin } = req.query;
    if (!codigo_cliente) {
      return res.status(400).json({ message: 'El código del cliente es requerido.' });
    }
    if (!fecha_inicio) {
      return res.status(400).json({ message: 'La fecha de inicio es requerida.' });
    }
    if (!fecha_fin) {
      return res.status(400).json({ message: 'La fecha de fin es requerida.' });
    }
    const fechaInicioDate = new Date(fecha_inicio);
    if (isNaN(fechaInicioDate.getTime())) {
      return res.status(400).json({ message: 'La fecha de inicio es inválida.' });
    }
    const fechaFinDate = new Date(fecha_fin);
    if (isNaN(fechaFinDate.getTime())) {
      return res.status(400).json({ message: 'La fecha de fin es inválida.' });
    }
    const cliente = await clientService.obtenerClientePorId(codigo_cliente);
    if (!cliente) {
      return res.status(404).json({ message: 'El cliente no existe.' });
    }

    const pedidos = await pedidoService.obtenerPedidosPorClienteFecha(codigo_cliente, fechaInicioDate, fechaFinDate);
    const total_pedidos = pedidos.reduce((acc, pedido) => acc + pedido.total, 0);
    return res.status(200).json({pedidos, total_pedidos});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

module.exports = { crearPedidoController, obtenerPedidosPorClienteController, reporteController }