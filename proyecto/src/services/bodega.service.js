const { client } = require("../db/db");
const Tuple = require('cassandra-driver').types.Tuple;
const BigDecimal = require('cassandra-driver').types.BigDecimal;

class BodegaService {
  async crearBodega({ codigo, capacidad }) {
    await client.execute(
      `
      INSERT INTO bodegas (codigo, capacidad, cuartos_frios) 
      VALUES (?, ?, ?);
      `,
      [codigo, capacidad, []], // Parámetros en un arreglo
      { prepare: true } // Prepara la consulta
    );
    return codigo;
  }

  async obtenerBodegaPorCodigo(codigo) {
    const result = await client.execute(`SELECT * FROM bodegas WHERE codigo = ?;`, [codigo], { prepare: true });
    if (result.rows.length === 0) {
      return null;
    }
    return { 
      ...result.rows[0],
      cuartos_frios: result.rows[0].cuartos_frios
        ?
          result.rows[0].cuartos_frios.map(tupla => {
            return {
              codigo_cuarto_frio: tupla.get(0),
              capacidad: tupla.get(1).toNumber(),
              temperatura: tupla.get(2).toNumber()
            }
          })
        : []
    };
  }

  async listarBodegas() {
    const result = await client.execute("SELECT * FROM bodegas;");
    return result.rows.map(row => {
      return {
        ...row,
        cuartos_frios: row.cuartos_frios ?
          row.cuartos_frios.map(tupla => {
            return {
              codigo_cuarto_frio: tupla.get(0),
              capacidad: tupla.get(1).toNumber(),
              temperatura: tupla.get(2).toNumber()
            }
          })
        : [] };
    });
  }

  async eliminarBodega(codigo) {
    await client.execute(`DELETE FROM bodegas WHERE codigo = ?;`, [codigo], { prepare: true });
  }

  async agregarCuartosFriosABodega(codigoBodega, cuartosFrios) {
    const tuplas = cuartosFrios.map(cuartoFrio => {
      return new Tuple(cuartoFrio.codigo_cuarto_frio, new BigDecimal((cuartoFrio.capacidad* 100), 2), new BigDecimal((cuartoFrio.temperatura*100), 2));
    });
    await client.execute(
      `
      UPDATE bodegas
      SET cuartos_frios = ?
      WHERE codigo = ?;
      `,
      [tuplas, codigoBodega], // Parámetros en un arreglo
      { prepare: true } // Prepara la consulta
    );
  }
}

module.exports = new BodegaService();