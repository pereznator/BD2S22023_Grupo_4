const { clientService } = require("../services/client.service");

const listClientsController = async(req, res) => {
  try {
    const clientes = await clientService.listarClientes();
    return res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor', error: error.toString() });
  }
};

const createClientController = async(req, res) => {
  try {
    const { direccion, nombre, representantelegal, telefono } = req.body;
    if (!nombre) {
      throw new Error('El nombre del cliente es requerido.');
    }
    if (!direccion) {
      throw new Error('La dirección del cliente es requerida.');
    }
    if (!telefono) {
      throw new Error('El teléfono del cliente es requerido.');
    }
    if (!representantelegal){
      throw new Error('El representante legal del cliente es requerido.');
    }
    const codigoCliente = await clientService.crearCliente({ direccion, nombre, representantelegal, telefono });

    const cliente = await clientService.obtenerClientePorId(codigoCliente);
    return res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }

}

const obtenerClientePorIdController = async(req, res) => {
  try {
    const { codigo } = req.params;
    if (!codigo) {
      throw new Error('El código del cliente es requerido.');
    }
    const cliente = await clientService.obtenerClientePorId(codigo);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }
    return res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
}

module.exports = { listClientsController, createClientController, obtenerClientePorIdController }