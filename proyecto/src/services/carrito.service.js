const { client } = require("../db/db");
const BigDecimal = require('cassandra-driver').types.BigDecimal;

class CarritoService {
  async crearItemCarrito({ codigo_cliente, codigo_producto, cantidad, nombre_producto, precio_unitario, subtotal, imagen }) {
    const precioUnitarioDecimal = new BigDecimal((precio_unitario * 100), 2);
    const subtotalDecimal = new BigDecimal((subtotal * 100), 2);
    await client.execute(`INSERT INTO carrito_por_cliente (codigo_cliente, codigo_producto, cantidad, imagen, nombre_producto, ordenado, precio_unitario, subtotal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [codigo_cliente, codigo_producto, cantidad, imagen, nombre_producto, false, precioUnitarioDecimal, subtotalDecimal], { prepare: true });
  }

  async listarItemsCarritoPorCliente(codigo_cliente) {
    const result = await client.execute(`SELECT * FROM carrito_por_cliente WHERE codigo_cliente = ? AND ordenado = ? ALLOW FILTERING;`, [codigo_cliente, false], { prepare: true });
    return result.rows.map(row => {
      return {
        ...row,
        precio_unitario: row.precio_unitario.toNumber(),
        subtotal: row.subtotal.toNumber()
      };
    });
  }

  async obtenerItemCarritoPorCodigos(codigo_cliente, codigo_producto) {
    const result = await client.execute(`SELECT * FROM carrito_por_cliente WHERE codigo_cliente = ? AND codigo_producto = ? AND ordenado = ? ALLOW FILTERING;`, [codigo_cliente, codigo_producto, false], { prepare: true });
    if (result.rows.length === 0) {
      return null;
    }
    return {
      ...result.rows[0],
      precio_unitario: result.rows[0].precio_unitario.toNumber(),
      subtotal: result.rows[0].subtotal.toNumber()
    };
  }

  async actualizarItemCarrito({ codigo_cliente, codigo_producto, cantidad, precio_unitario, subtotal }) {
    const precioUnitarioDecimal = new BigDecimal((precio_unitario * 100), 2);
    const subtotalDecimal = new BigDecimal((subtotal * 100), 2);
    const selectQuery = `SELECT * FROM carrito_por_cliente WHERE codigo_cliente = ? AND codigo_producto = ? AND ordenado = false ALLOW FILTERING;`;
    const result = await client.execute(selectQuery, [codigo_cliente, codigo_producto], { prepare: true });
    
    if (result.rowLength === 0) {
      throw new Error('El item del carrito no existe.');
    }
    // Solo actualizar si la condición se cumple
    const updateQuery = `UPDATE carrito_por_cliente SET cantidad = ?, precio_unitario = ?, subtotal = ? WHERE codigo_cliente = ? AND codigo_producto = ?;`;
    await client.execute(updateQuery, [cantidad, precioUnitarioDecimal, subtotalDecimal, codigo_cliente, codigo_producto], { prepare: true });
    return true; 
  }

  async eliminarItemCarrito({ codigo_cliente, codigo_producto }) {
    const deleteQuery = `DELETE FROM carrito_por_cliente WHERE codigo_cliente = ? AND codigo_producto = ?;`;
    await client.execute(deleteQuery, [codigo_cliente, codigo_producto], { prepare: true });
    return true;
  }

  async actualizarItemsCarritoOrdenados({ codigo_cliente }) {
    const result = await client.execute(
      `SELECT codigo_producto FROM carrito_por_cliente WHERE codigo_cliente = ?;`,
      [codigo_cliente],
      { prepare: true }
    );

    for (const row of result.rows) {
      await client.execute(
        `UPDATE carrito_por_cliente SET ordenado = true WHERE codigo_cliente = ? AND codigo_producto = ?;`,
        [codigo_cliente, row.codigo_producto],
        { prepare: true }
      );
    }  
  
  }
}

module.exports = new CarritoService();