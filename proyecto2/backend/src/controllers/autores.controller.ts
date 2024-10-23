import { Request, Response } from "express";
import { AutoresQuery, AutorService } from "../services/autores.service";
import { validarQueryParams } from "../utils";
import { LibroService } from "../services/libros.service";

const autorService = new AutorService();
const librosService = new LibroService();

// Crear un nuevo autor
export async function crearAutorController(req: Request, res: Response): Promise<any> {
  try {
    const { nombre, apellido, nacionalidad } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: "El nombre del autor es requerido" });
    }
    if (!apellido) {
      return res.status(400).json({ message: "El apellido del autor es requerido" });
    }
    if (!nacionalidad) {
      return res.status(400).json({ message: "La nacionalidad del autor es requerida" });
    }
    const nuevoAutor = await autorService.crearAutor(nombre, apellido, nacionalidad);

    if (!nuevoAutor) {
      return res.status(400).json({ message: "No se pudo crear el autor" });
    }

    res.status(201).json(nuevoAutor);
  } catch (error: Error | any) {
    console.error("Error en crearAutorController:", error);
    res.status(500).json({ message: "Error al crear el autor", error: error.message });
  }
}

// Obtener todos los autores
export async function obtenerAutoresController(req: Request, res: Response): Promise<any> {
  try {
    const { nacionalidad, nombre, cantidadLibros, cantidadNacionalidades } = req.query;
    const query: AutoresQuery = {};
    if (validarQueryParams(nacionalidad)) {
      query.nacionalidad = nacionalidad.toString();
    }
    if (validarQueryParams(nombre)) {
      query.nombre = nombre.toString();
    }
    if (validarQueryParams(cantidadLibros)) {
      query.cantidadLibros = parseInt(cantidadLibros.toString());
    }
    if (validarQueryParams(cantidadNacionalidades)) {
      query.cantidadNacionalidades = parseInt(cantidadNacionalidades.toString());
    }
    const autores = await autorService.obtenerAutores(query);

    if (!autores) {
      return res.status(500).json({ message: "Error al obtener los autores" });
    }

    res.status(200).json(autores);
  } catch (error: Error | any) {
    console.error("Error en obtenerAutoresController:", error);
    res.status(500).json({ message: "Error al obtener los autores", error: error.message });
  }
}

// Obtener un autor por ID
export async function obtenerAutorPorIdController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const autor = await autorService.obtenerAutorPorId(id);

    if (!autor) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    res.status(200).json(autor);
  } catch (error: Error | any) {
    console.error("Error en obtenerAutorPorIdController:", error);
    res.status(500).json({ message: "Error al obtener el autor", error: error.message });
  }
}

// Actualizar un autor
export async function actualizarAutorController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const { nombre, apellido, nacionalidad } = req.body;

    const autorActualizado = await autorService.actualizarAutor(id, nombre, apellido, nacionalidad);

    if (!autorActualizado) {
      return res.status(400).json({ message: "No se pudo actualizar el autor" });
    }

    res.status(200).json(autorActualizado);
  } catch (error: Error | any) {
    console.error("Error en actualizarAutorController:", error);
    res.status(500).json({ message: "Error al actualizar el autor", error: error.message });
  }
}

// Eliminar un autor
export async function eliminarAutorController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;

    const autor = await autorService.obtenerAutorPorId(id);
    if (!autor) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    await librosService.eliminarLibrosPorAutor(id);

    const autorEliminado = await autorService.eliminarAutor(id);

    if (!autorEliminado) {
      return res.status(400).json({ message: "No se pudo eliminar el autor" });
    }

    res.status(200).json({ message: "Autor eliminado con éxito" });
  } catch (error: Error | any) {
    console.error("Error en eliminarAutorController:", error);
    res.status(500).json({ message: "Error al eliminar el autor", error: error.message });
  }
}
