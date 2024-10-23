import { Request, Response } from "express";
import { LibroService, LibrosQuery } from "../services/libros.service";
import { AutorService } from "../services/autores.service";
import { validarQueryParams } from "../utils";

const libroService = new LibroService();
const autorService = new AutorService();

// Crear un nuevo libro
export async function crearLibroController(req: Request, res: Response): Promise<any> {
  try {
    const { titulo, autor_id, anio_publicacion, genero, disponibilidad } = req.body;
    
    if (!titulo) {
      return res.status(400).json({ message: "El título del libro es requerido" });
    }
    if (!autor_id) {
      return res.status(400).json({ message: "El autor del libro es requerido" });
    }
    if (!anio_publicacion) {
      return res.status(400).json({ message: "El año de publicación del libro es requerido" });
    }
    if (!genero) {
      return res.status(400).json({ message: "El género del libro es requerido" });
    }

    const autor = await autorService.obtenerAutorPorId(autor_id);
    if (!autor) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }
    
    const nuevoLibro = await libroService.crearLibro(titulo, autor_id, anio_publicacion, genero, disponibilidad);
    
    if (!nuevoLibro) {
      return res.status(400).json({ message: "No se pudo crear el libro" });
    }
    
    res.status(201).json(nuevoLibro);
  } catch (error) {
    console.error("Error en crearLibroController:", error);
    res.status(500).json({ message: "Error al crear el libro" });
  }
}

// Obtener todos los libros
export async function obtenerLibrosController(req: Request, res: Response): Promise<any> {
  try {
    const { genero, anio_inicio, anio_fin, autor, titulo, disponibilidad } = req.query;
    
    const query: LibrosQuery = {};
    if (validarQueryParams(genero)) {
      query.genero = genero.toString();
    }
    if (validarQueryParams(anio_inicio)) {
      query.anio_inicio = parseInt(anio_inicio.toString());
    }
    if (validarQueryParams(anio_fin)) {
      query.anio_fin = parseInt(anio_fin.toString());
    }
    if (validarQueryParams(autor)) {
      query.autor = autor.toString();
    }
    if (validarQueryParams(titulo)) {
      query.titulo = titulo.toString();
    }
    if (validarQueryParams(disponibilidad)) {
      query.disponibilidad = disponibilidad === "true";
    }
    
    const libros = await libroService.obtenerLibros(query);
    
    res.status(200).json(libros);
  } catch (error) {
    console.error("Error en obtenerLibrosController:", error);
    res.status(500).json({ message: "Error al obtener los libros" });
  }
}

// Obtener un libro por ID
export async function obtenerLibroPorIdController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const libro = await libroService.obtenerLibroPorId(id);
    
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    const autor = libro.autor_id;
    delete libro.autor_id;
    res.status(200).json({
      _id: libro._id,
      titulo: libro.titulo,
      autor,
      anio_publicacion: libro.anio_publicacion,
      genero: libro.genero,
      disponibilidad: libro.disponibilidad
    });
    
  } catch (error) {
    console.error("Error en obtenerLibroPorIdController:", error);
    res.status(500).json({ message: "Error al obtener el libro" });
  }
}

// Actualizar un libro
export async function actualizarLibroController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const { titulo, autor_id, anio_publicacion, genero, disponibilidad } = req.body;

    const libro = await libroService.obtenerLibroPorId(id);
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    if (autor_id) {
      if (libro.autor_id.toString() !== autor_id) {
        const autor = await autorService.obtenerAutorPorId(autor_id);
        if (!autor) {
          return res.status(404).json({ message: "Autor no encontrado" });
        }
      }
    }
    
    const libroActualizado = await libroService.actualizarLibro(id, titulo, autor_id, anio_publicacion, genero, disponibilidad);
    
    if (!libroActualizado) {
      return res.status(400).json({ message: "No se pudo actualizar el libro" });
    }
    
    res.status(200).json(libroActualizado);
  } catch (error) {
    console.error("Error en actualizarLibroController:", error);
    res.status(500).json({ message: "Error al actualizar el libro" });
  }
}

// Eliminar un libro
export async function eliminarLibroController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    
    const libroEliminado = await libroService.eliminarLibro(id);
    
    if (!libroEliminado) {
      return res.status(400).json({ message: "No se pudo eliminar el libro" });
    }
    
    res.status(200).json({ message: "Libro eliminado con éxito" });
  } catch (error) {
    console.error("Error en eliminarLibroController:", error);
    res.status(500).json({ message: "Error al eliminar el libro" });
  }
}


export async function obtenerLibrosMasRecientes(req: Request, res: Response): Promise<any> {
  try {
    const libros = await libroService.librosMasRecientes();
    
    res.status(200).json(libros);
  } catch (error) {
    console.error("Error en obtenerLibrosMasRecientes:", error);
    res.status(500).json({ message: "Error al obtener los libros más recientes" });
  }
}

