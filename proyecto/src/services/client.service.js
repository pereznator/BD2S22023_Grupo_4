const { client } = require("../db/db");
const { v4: uuidv4 } = require('uuid')

class ClientService {
  async listarClientes() {
    const result = await client.execute("SELECT * FROM clientes;");
    return result.rows;
  }

  async crearCliente({ direccion, nombre, representantelegal, telefono }) {
    const newId = uuidv4();
    await client.execute(
      `
      INSERT INTO clientes (codigo, direccion, nombre, representantelegal, telefono, tipo, descuento) 
      VALUES (?, ?, ?, ?, ?, 'A', 0);
      `,
      [newId, direccion, nombre, representantelegal, telefono], // Parámetros en un arreglo
      { prepare: true } // Prepara la consulta
    );
    return newId;
  }

  async obtenerClientePorId(id) {
    const result = await client.execute(`SELECT * FROM clientes WHERE codigo = ?;`, [id], { prepare: true });
    return result.rows.length > 0 ? result.rows[0] : null;
  }
}

const clientService = new ClientService()

module.exports = { clientService };