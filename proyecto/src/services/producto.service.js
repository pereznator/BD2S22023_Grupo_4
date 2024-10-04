const { v4: uuidv4 } = require('uuid');
const { client } = require('../db/db');
const Tuple = require('cassandra-driver').types.Tuple;
const BigDecimal = require('cassandra-driver').types.BigDecimal;

class ProductoService {
  async crearProducto({ imagen, nombre, fabricante, marca, precio_actual, codigo_bodega, capacidad_bodega_cubica, codigo_cuarto_frio, capacidad_cuarto_frio, temperatura_cuarto_frio }) {
    const productoId = uuidv4();
    const historico_precios = [new Tuple(new BigDecimal(precio_actual), new Date())];
    const decimalPrecio = new BigDecimal((precio_actual * 100), 2);
    const decimalCapacidadBodega = new BigDecimal((capacidad_bodega_cubica * 100), 2);
    const decimalCapacidadCuartoFrio = capacidad_cuarto_frio ? new BigDecimal((capacidad_cuarto_frio * 100), 2) : null;
    const decimalTemperaturaCuartoFrio = temperatura_cuarto_frio ? new BigDecimal((temperatura_cuarto_frio * 100), 2) : null;
    await client.execute(
      `INSERT INTO productos (codigo, imagen, nombre, fabricante, marca, precio_actual, historico_precios, codigo_bodega, capacidad_bodega_cubica, codigo_cuarto_frio, capacidad_cuarto_frio, temperatura_cuarto_frio, disponible) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [productoId, imagen, nombre, fabricante, marca, decimalPrecio, historico_precios, codigo_bodega, decimalCapacidadBodega, codigo_cuarto_frio, decimalCapacidadCuartoFrio, decimalTemperaturaCuartoFrio, true],
      { prepare: true }
    );

    return productoId;
  }

  async obtenerProductoPorId(id) {
    const result = await client.execute(`SELECT * FROM productos WHERE codigo = ?;`, [id], { prepare: true });
    if (result.rows.length === 0) {
      return null;
    }
    return {
      ...result.rows[0],
      precio_actual: result.rows[0].precio_actual.toNumber(),
      capacidad_bodega_cubica: result.rows[0].capacidad_bodega_cubica.toNumber(),
      capacidad_cuarto_frio: result.rows[0].capacidad_cuarto_frio ? result.rows[0].capacidad_cuarto_frio.toNumber() : null,
      temperatura_cuarto_frio: result.rows[0].temperatura_cuarto_frio ? result.rows[0].temperatura_cuarto_frio.toNumber() : null,
      historico_precios: result.rows[0].historico_precios ?
        result.rows[0].historico_precios.map(tupla => {
          return {
            precio: tupla.get(0).toNumber(),
            fecha: tupla.get(1)
          }
        })
        : []
    };
  }

  async listarProductos(nombreProducto) {
    let queryNombrePrducto = "";
    if (nombreProducto) {
      queryNombrePrducto = `WHERE nombre = '${nombreProducto}'`;
    }
    const result = await client.execute(`SELECT * FROM productos ${queryNombrePrducto};`);
    return result.rows.map(row => {
      return {
        ...row,
        precio_actual: row.precio_actual.toNumber(),
        capacidad_bodega_cubica: row.capacidad_bodega_cubica.toNumber(),
        capacidad_cuarto_frio: row.capacidad_cuarto_frio ? row.capacidad_cuarto_frio.toNumber() : null,
        temperatura_cuarto_frio: row.temperatura_cuarto_frio ? row.temperatura_cuarto_frio.toNumber() : null,
        historico_precios: row.historico_precios ?
          row.historico_precios.map(tupla => {
            return {
              precio: tupla.get(0).toNumber(),
              fecha: tupla.get(1)
            }
          })
          : []
      };
    });
  }

  async eliminarProducto(codigoProducto) {
    await client.execute(`DELETE FROM productos WHERE codigo = ?;`, [codigoProducto], { prepare: true });
  }

  async actualizarProducto(producto) {
    console.log(producto);
    const { codigo, imagen, nombre, fabricante, marca, precio_actual, codigo_bodega, capacidad_bodega_cubica, codigo_cuarto_frio, historico_precios, capacidad_cuarto_frio, temperatura_cuarto_frio } = producto;
    const decimalPrecio = new BigDecimal((precio_actual * 100), 2);
    const decimalCapacidadBodega = new BigDecimal((capacidad_bodega_cubica * 100), 2);
    const decimalCapacidadCuartoFrio = capacidad_cuarto_frio ? new BigDecimal((capacidad_cuarto_frio * 100), 2) : null;
    const decimalTemperaturaCuartoFrio = temperatura_cuarto_frio ? new BigDecimal((temperatura_cuarto_frio * 100), 2) : null;
    const tuplasPrecios = historico_precios.map(precio => new Tuple(new BigDecimal(precio.precio * 100, 2), precio.fecha));
    await client.execute(
      `
      UPDATE productos
      SET imagen = ?, nombre = ?, fabricante = ?, marca = ?, precio_actual = ?, codigo_bodega = ?, capacidad_bodega_cubica = ?, codigo_cuarto_frio = ?, capacidad_cuarto_frio = ?, temperatura_cuarto_frio = ?, historico_precios = ?
      WHERE codigo = ?;
      `,
      [imagen, nombre, fabricante, marca, decimalPrecio, codigo_bodega, decimalCapacidadBodega, codigo_cuarto_frio, decimalCapacidadCuartoFrio, decimalTemperaturaCuartoFrio, tuplasPrecios, codigo], // Parámetros en un arreglo
      { prepare: true } // Prepara la consulta
    );
  }
}

module.exports = new ProductoService();