const { v4: uuidv4 } = require('uuid');
const BigDecimal = require('cassandra-driver').types.BigDecimal;
const Tuple = require('cassandra-driver').types.Tuple;
const { client } = require("../db/db");

class PedidoService {
  async crearPedido({codigo_cliente, fecha_pedido, total_pedido, descuento_aplicado, detalles, tipo_cliente}) {
    const pedidoId = uuidv4();
    const totalPedidoDecimal = new BigDecimal((total_pedido * 100), 2);
    const descuentoAplicadoDecimal = new BigDecimal((descuento_aplicado * 100), 2);
    const tuplas = detalles.map(detalle => {
      return new Tuple(detalle.codigo_producto, detalle.nombre_producto, detalle.imagen, detalle.codigo_bodega, detalle.codigo_cuarto_frio, new BigDecimal((detalle.precio_unitario * 100), 2), detalle.cantidad, new BigDecimal((detalle.subtotal * 100), 2));
    });

    await client.execute(`INSERT INTO pedidos_por_cliente (codigo_cliente, pedido_id, fecha_pedido, total_pedido, descuento_aplicado, tipo_cliente, detalles) VALUES (?, ?, ?, ?, ?, ?, ?);`, [codigo_cliente, pedidoId, fecha_pedido, totalPedidoDecimal, descuentoAplicadoDecimal, tipo_cliente, tuplas], { prepare: true });
    return pedidoId;
  }

  async obtenerPedidoPorId(codigo_cliente, pedido_id) {
    const result = await client.execute(`SELECT * FROM pedidos_por_cliente WHERE codigo_cliente = ? AND pedido_id = ?;`, [codigo_cliente, pedido_id], { prepare: true });
    if (result.rows.length === 0) {
      return null;
    }
    return {
      ...result.rows[0],
      total_pedido: result.rows[0].total_pedido.toNumber(),
      descuento_aplicado: result.rows[0].descuento_aplicado.toNumber(),
      detalles: result.rows[0].detalles.map(tupla => {
        return {
          codigo_producto: tupla.get(0),
          nombre_producto: tupla.get(1),
          imagen: tupla.get(2),
          codigo_bodega: tupla.get(3),
          codigo_cuarto_frio: tupla.get(4),
          precio_unitario: tupla.get(5).toNumber(),
          cantidad: tupla.get(6),
          precio_total: tupla.get(7).toNumber()
        };
      })
    };
  }
  
  async obtenerPedidosPorCliente(codigo_cliente) {
    const result = await client.execute(`SELECT * FROM pedidos_por_cliente WHERE codigo_cliente = ?;`, [codigo_cliente], { prepare: true });
    return result.rows.map(row => {
      return {
        ...row,
        total_pedido: row.total_pedido.toNumber(),
        descuento_aplicado: row.descuento_aplicado.toNumber(),
        detalles: row.detalles.map(tupla => {
          return {
            codigo_producto: tupla.get(0),
            nombre_producto: tupla.get(1),
            imagen: tupla.get(2),
            codigo_bodega: tupla.get(3),
            codigo_cuarto_frio: tupla.get(4),
            precio_unitario: tupla.get(5).toNumber(),
            cantidad: tupla.get(6),
            precio_total: tupla.get(7).toNumber()
          };
        })
      };
    });
  }

  async crearPedidoPorClienteFecha({codigo_cliente, fecha, pedido_id, descuento_aplicado, nombre_cliente, tipo_cliente, total}) {
    const totalPedidoDecimal = new BigDecimal((total * 100), 2);
    const descuentoAplicadoDecimal = new BigDecimal((descuento_aplicado * 100), 2);
    await client.execute(`INSERT INTO pedidos_por_cliente_fecha (codigo_cliente, fecha, pedido_id, descuento_aplicado, nombre_cliente, tipo_cliente, total) VALUES (?, ?, ?, ?, ?, ?, ?);`, [codigo_cliente, fecha, pedido_id, descuentoAplicadoDecimal, nombre_cliente, tipo_cliente, totalPedidoDecimal], { prepare: true });
  }

  async obtenerPedidosPorClienteFecha(codigo_cliente, fechaInicio, fechaFin) {
    const results = await client.execute(`SELECT * FROM pedidos_por_cliente_fecha WHERE codigo_cliente = ? AND fecha >= ? AND fecha <= ?;`, [codigo_cliente, fechaInicio, fechaFin], { prepare: true });
    return results.rows.map(row => {
      return {
        ...row,
        total: row.total.toNumber(),
        descuento_aplicado: row.descuento_aplicado.toNumber()
      };
    });
  }
}

module.exports = new PedidoService();