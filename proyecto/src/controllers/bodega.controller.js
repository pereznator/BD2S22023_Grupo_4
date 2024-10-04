const bodegaService = require('../services/bodega.service');

const crearBodegaController = async(req, res) => {
  try {
    const { codigo, capacidad } = req.body;
    if (!codigo) {
      return res.status(400).json({ message: 'El código es obligatorio.' });
    }
    if (!capacidad) {
      return res.status(400).json({ message: 'La capacidad es obligatoria.' });
    }
    const codigoBodega = await bodegaService.crearBodega({ codigo, capacidad });
    const bodega = await bodegaService.obtenerBodegaPorCodigo(codigoBodega);
    return res.status(201).json(bodega);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
};

const listarBodegasController = async(req, res) => {
  try {
    const bodegas = await bodegaService.listarBodegas();
    return res.status(200).json(bodegas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
}

const eliminarBodegaController = async(req, res) => {
  try {
    const { codigo } = req.params;
    if (!codigo) {
      return res.status(400).json({ message: 'El código es obligatorio.' });
    }
    const bodega = await bodegaService.obtenerBodegaPorCodigo(codigo);
    if (!bodega) {
      return res.status(404).json({ message: 'Bodega no encontrada.' });
    }
    await bodegaService.eliminarBodega(codigo);
    return res.status(204).send(codigo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
}

const crearCuartoFrioController = async(req, res) => {
  try {
    const { codigo_bodega, codigo_cuarto_frio, capacidad, temperatura } = req.body;
    if (!codigo_bodega) {
      return res.status(400).json({ message: 'El código de la bodega es obligatorio.' });
    }
    if (!codigo_cuarto_frio) {
      return res.status(400).json({ message: 'El código del cuarto frío es obligatorio.' });
    }
    if (!capacidad) {
      return res.status(400).json({ message: 'La capacidad es obligatoria.' });
    }
    if (!temperatura) {
      return res.status(400).json({ message: 'La temperatura es obligatoria.' });
    }
    const bodega = await bodegaService.obtenerBodegaPorCodigo(codigo_bodega);
    if (!bodega) {
      return res.status(404).json({ message: 'Bodega no encontrada.' });
    }
    const cuartosFrios = bodega.cuartos_frios || [];

    const cuartoFrioExistente = cuartosFrios.find(cuartoFrio => cuartoFrio.codigo_cuarto_frio === codigo_cuarto_frio);
    if (cuartoFrioExistente) {
      return res.status(400).json({ message: `El cuarto frío con codigo '${codigo_cuarto_frio}' ya existe en la bodega.` });
    }

    cuartosFrios.push({ codigo_cuarto_frio, capacidad, temperatura });
    console.log(cuartosFrios);
    await bodegaService.agregarCuartosFriosABodega(codigo_bodega, cuartosFrios);
    return res.status(201).json(cuartosFrios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
}

const elminarCuartoFrioController = async(req, res) => {
  try {
    const { codigo_bodega, codigo_cuarto_frio } = req.params;
    if (!codigo_bodega) {
      return res.status(400).json({ message: 'El código de la bodega es obligatorio.' });
    }
    if (!codigo_cuarto_frio) {
      return res.status(400).json({ message: 'El código del cuarto frío es obligatorio.' });
    }
    const bodega = await bodegaService.obtenerBodegaPorCodigo(codigo_bodega);
    if (!bodega) {
      return res.status(404).json({ message: 'Bodega no encontrada.' });
    }
    const cuartosFrios = bodega.cuartos_frios || [];
    const cuartoFrioExistente = cuartosFrios.find(cuartoFrio => cuartoFrio.codigo_cuarto_frio === codigo_cuarto_frio);
    if (!cuartoFrioExistente) {
      return res.status(404).json({ message: `El cuarto frío con código '${codigo_cuarto_frio}' no existe en la bodega.` });
    }
    const cuartosFriosActualizados = cuartosFrios.filter(cuartoFrio => cuartoFrio.codigo_cuarto_frio !== codigo_cuarto_frio);
    await bodegaService.agregarCuartosFriosABodega(codigo_bodega, cuartosFriosActualizados);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor.', error: error.toString() });
  }
}

module.exports = { crearBodegaController, listarBodegasController, eliminarBodegaController, crearCuartoFrioController, elminarCuartoFrioController };