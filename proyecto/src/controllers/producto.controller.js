const productoService = require('../services/producto.service');
const bodegaService = require('../services/bodega.service');

const crearProductoController = async(req, res) => {
  try {
    const { imagen, nombre, fabricante, marca, precio_actual, codigo_bodega, codigo_cuarto_frio } = req.body;
    if (!nombre) {
      throw new Error('El nombre del producto es requerido.');
    }
    if (!fabricante) {
      throw new Error('El fabricante del producto es requerido.');
    }
    if (!marca) {
      throw new Error('La marca del producto es requerida.');
    }
    if (!precio_actual) {
      throw new Error('El precio actual del producto es requerido.');
    }
    if (!codigo_bodega) {
      throw new Error('El código de la bodega es requerido.');
    }
    if(!imagen){
      throw new Error('La imagen del producto es requerida.');
    }

    const bodega = await bodegaService.obtenerBodegaPorCodigo(codigo_bodega);
    console.log(bodega);
    if (!bodega) {
      throw new Error('La bodega no existe.');
    }

    let cuartoFrioBody = {};

    if (codigo_cuarto_frio) {
      const cuartosFrios = bodega.cuartos_frios;
      const cuartoFrio = cuartosFrios.find(cuartoFrio => cuartoFrio.codigo_cuarto_frio === codigo_cuarto_frio);
      if (!cuartoFrio) {
        throw new Error(`El cuarto frío '${codigo_cuarto_frio}' no existe.`);
      }

      cuartoFrioBody = {
        codigo_cuarto_frio: cuartoFrio.codigo_cuarto_frio,
        capacidad_cuarto_frio: cuartoFrio.capacidad,
        temperatura_cuarto_frio: cuartoFrio.temperatura
      };
    }

    const productoId = await productoService.crearProducto({ imagen, nombre, fabricante, marca, precio_actual, codigo_bodega, capacidad_bodega_cubica: bodega.capacidad, ...cuartoFrioBody });
    const producto = await productoService.obtenerProductoPorId(productoId);
    return res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

const listarProductosController = async(req, res) => {
  try {
    const { nombreproducto } = req.query;
    const productos = await productoService.listarProductos(nombreproducto);
    return res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
}

const eliminarProductoController = async(req, res) => {
  try {
    const { codigo } = req.params;
    const producto = await productoService.obtenerProductoPorId(codigo);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    await productoService.eliminarProducto(codigo);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

const actualizarProductoController = async(req, res) => {
  try {
    const { codigo } = req.params;
    const producto = await productoService.obtenerProductoPorId(codigo);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    const { imagen, nombre, fabricante, marca, precio_actual, codigo_bodega, codigo_cuarto_frio } = req.body;
    if (imagen) {
      producto.imagen = imagen;
    }
    if (nombre) {
      producto.nombre = nombre;
    }
    if (fabricante) {
      producto.fabricante = fabricante;
    }
    if (marca) {
      producto.marca = marca;
    }
    if (precio_actual) {
      if (Math.round(producto.precio_actual) !== Math.round(precio_actual)) {
        producto.precio_actual = precio_actual;
        producto.historico_precios.push({ precio: precio_actual, fecha: new Date() });
      }
    }
    if (codigo_bodega) {
      if (producto.codigo_bodega !== codigo_bodega) {
        const bodega = await bodegaService.obtenerBodegaPorCodigo(codigo_bodega);
        if (!bodega) {
          throw new Error('La bodega no existe.');
        }
        producto.codigo_bodega = codigo_bodega;
        producto.capacidad_bodega_cubica = bodega.capacidad;
        if (codigo_cuarto_frio) {
          const cuartoFrio = bodega.cuartos_frios.find(cuartoFrio => cuartoFrio.codigo_cuarto_frio === codigo_cuarto_frio);
          if (!cuartoFrio) {
            throw new Error(`El cuarto frío '${codigo_cuarto_frio}' no existe en la bodega '${bodega.codigo}'.`);
          }
          producto.codigo_cuarto_frio = codigo_cuarto_frio;
          producto.capacidad_cuarto_frio = cuartoFrio.capacidad;
          producto.temperatura_cuarto_frio = cuartoFrio.temperatura;
        } else {
          producto.codigo_cuarto_frio = null;
          producto.capacidad_cuarto_frio = null;
          producto.temperatura_cuarto_frio = null;
        }
      }
    } else {
      if (codigo_cuarto_frio) {
        const bodega = await bodegaService.obtenerBodegaPorCodigo(producto.codigo_bodega);
        const cuartoFrio = bodega.cuartos_frios.find(cuartoFrio => cuartoFrio.codigo_cuarto_frio === codigo_cuarto_frio);
        if (!cuartoFrio) {
          throw new Error(`El cuarto frío '${codigo_cuarto_frio}' no existe en la bodega '${bodega.codigo}'.`);
        }
        producto.codigo_cuarto_frio = codigo_cuarto_frio;
        producto.capacidad_cuarto_frio = cuartoFrio.capacidad;
        producto.temperatura_cuarto_frio = cuartoFrio.temperatura;
      }
    }
    await productoService.actualizarProducto(producto);
    return res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
}

module.exports = { crearProductoController, listarProductosController, eliminarProductoController, actualizarProductoController };