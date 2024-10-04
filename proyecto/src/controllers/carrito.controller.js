const productoService = require('../services/producto.service');
const { clientService } = require("../services/client.service");
const carritoService = require('../services/carrito.service');

const crearItemCarritoController = async (req, res) => {
  try {
    const { codigo_cliente, codigo_producto, cantidad } = req.body;
    if (!codigo_cliente) {
      return res.status(400).json({ message: 'El código del cliente es requerido.' });
    }
    if (!codigo_producto) {
      return res.status(400).json({ message: 'El código del producto es requerido.' });
    }
    if (!cantidad) {
      return res.status(400).json({ message: 'La cantidad es requerida.' });
    }
    const cliente = await clientService.obtenerClientePorId(codigo_cliente);
    if (!cliente) {
      return res.status(404).json({ message: 'El cliente no existe.' });
    }

    const producto = await productoService.obtenerProductoPorId(codigo_producto);
    if (!producto) {
      return res.status(404).json({ message: 'El producto no existe.' });
    }

    const precio_unitario = producto.precio_actual;
    const nombre_producto = producto.nombre;
    const subtotal = precio_unitario * cantidad;
    const imagen = producto.imagen;

    await carritoService.crearItemCarrito({ codigo_cliente, codigo_producto, cantidad, nombre_producto, precio_unitario, subtotal, imagen });
    const itemsCarrito = await carritoService.obtenerItemCarritoPorCodigos(codigo_cliente, codigo_producto);
    return res.status(201).json(itemsCarrito);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

const listarItemsCarritoPorClienteController = async (req, res) => {
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
    return res.status(200).json(itemsCarrito);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

const actualizarItemCarritoController = async (req, res) => {
  try {
    const { codigo_cliente, codigo_producto, cantidad } = req.body;
    if (!codigo_cliente) {
      return res.status(400).json({ message: 'El código del cliente es requerido.' });
    }
    if (!codigo_producto) {
      return res.status(400).json({ message: 'El código del producto es requerido.' });
    }
    if (!cantidad) {
      return res.status(400).json({ message: 'La cantidad es requerida.' });
    }

    const cliente = await clientService.obtenerClientePorId(codigo_cliente);
    if (!cliente) {
      return res.status(404).json({ message: 'El cliente no existe.' });
    }

    const producto = await productoService.obtenerProductoPorId(codigo_producto);
    if (!producto) {
      return res.status(404).json({ message: 'El producto no existe.' });
    }

    const itemCarrito = await carritoService.obtenerItemCarritoPorCodigos(codigo_cliente, codigo_producto);
    if (!itemCarrito) {
      return res.status(404).json({ message: 'El item del carrito no existe.' });
    }

    const precio_unitario = producto.precio_actual;
    const subtotal = precio_unitario * cantidad;

    await carritoService.actualizarItemCarrito({ codigo_cliente, codigo_producto, cantidad, precio_unitario, subtotal });
    const itemsCarrito = await carritoService.obtenerItemCarritoPorCodigos(codigo_cliente, codigo_producto);
    return res.status(200).json(itemsCarrito);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

const eliminarItemCarritoController = async (req, res) => {
  try {
    const { codigo_cliente, codigo_producto } = req.params;
    if (!codigo_cliente) {
      return res.status(400).json({ message: 'El código del cliente es requerido.' });
    }
    if (!codigo_producto) {
      return res.status(400).json({ message: 'El código del producto es requerido.' });
    }
    const cliente = await clientService.obtenerClientePorId(codigo_cliente);
    if (!cliente) {
      return res.status(404).json({ message: 'El cliente no existe.' });
    }
    const producto = await productoService.obtenerProductoPorId(codigo_producto);
    if (!producto) {
      return res.status(404).json({ message: 'El producto no existe.' });
    }

    const itemCarrito = await carritoService.obtenerItemCarritoPorCodigos(codigo_cliente, codigo_producto);
    if (!itemCarrito) {
      return res.status(404).json({ message: 'El item del carrito no existe.' });
    }
    await carritoService.eliminarItemCarrito({ codigo_cliente, codigo_producto });
    return res.status(200).json({ message: 'Item eliminado.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

module.exports = { crearItemCarritoController, listarItemsCarritoPorClienteController, actualizarItemCarritoController, eliminarItemCarritoController };