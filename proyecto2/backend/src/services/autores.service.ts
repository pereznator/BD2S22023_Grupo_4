import AutorModel from "../schemas/autor.schema"; // Asegúrate de tener este modelo ya configurado
import { Types } from "mongoose";

export interface AutoresQuery {
  nacionalidad?: string;
  nombre?: string;
  cantidadLibros?: number;
  cantidadNacionalidades?: number;
}

export class AutorService {
  
  async crearAutor(nombre: string, apellido: string, nacionalidad: string) {
    const nuevoAutor = new AutorModel({ nombre, apellido, nacionalidad });
    const autorGuardado = await nuevoAutor.save().catch(() => null);
    return autorGuardado;
  }

  async obtenerAutores(query: AutoresQuery) {
    const pipeline: any[] = [];

    // Filtro por nacionalidad
    if (query.nacionalidad) {
      pipeline.push({
        $match: { nacionalidad: query.nacionalidad },
      });
    }

    // Filtro por nombre o apellido (regex)
    if (query.nombre) {
      pipeline.push({
        $match: {
          $or: [
            { nombre: { $regex: query.nombre, $options: "i" } },
            { apellido: { $regex: query.nombre, $options: "i" } },
          ],
        },
      });
    }

    // Lookup para obtener los libros de cada autor
    pipeline.push({
      $lookup: {
        from: "libros", // nombre de la colección de libros
        localField: "_id", // campo _id de la colección de autores
        foreignField: "autor_id", // campo en la colección de libros que referencia al autor
        as: "libros", // nombre del campo donde se guardarán los libros
      },
    });

    // Contar la cantidad de libros por autor
    pipeline.push({
      $addFields: {
        cantidadLibros: { $size: "$libros" }, // tamaño del array de libros será la cantidad de libros escritos
      },
    });

    pipeline.push({
      $addFields: {
        cantidadNacionalidades: { $size: "$nacionalidad" }, // cuenta el tamaño del array de nacionalidades
      },
    });

    // Filtrar por cantidad de libros si se proporcionó en la query
    if (query.cantidadLibros !== undefined) {
      pipeline.push({
        $match: {
          cantidadLibros: { $gte: query.cantidadLibros }, // cantidad de libros mayor o igual a la proporcionada
        },
      });
    }

    // Filtrar por número de nacionalidades si se proporcionó en la query
    if (query.cantidadNacionalidades !== undefined) {
      pipeline.push({
        $match: {
          cantidadNacionalidades: { $gte: query.cantidadNacionalidades }, // número de nacionalidades mayor o igual al indicado
        },
      });
    }

    // Proyectar solo los campos relevantes (opcional)
    pipeline.push({
      $project: {
        nombre: 1,
        apellido: 1,
        nacionalidad: 1,
        cantidadLibros: 1, // se incluye la cantidad de libros
        cantidadNacionalidades: 1, // se incluye la cantidad de nacionalidades
      },
    });

    // Ejecutar el pipeline
    const autores = await AutorModel.aggregate(pipeline).catch(() => null);
    
    return autores;
  }

  async obtenerAutorPorId(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const autor = await AutorModel.findById(id).catch(() => null);
    return autor;
  }

  async actualizarAutor(id: string, nombre: string, apellido: string, nacionalidad: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const autorActualizado = await AutorModel.findByIdAndUpdate(
      id,
      { nombre, apellido, nacionalidad },
      { new: true }
    ).catch(() => null);
    return autorActualizado;
  }

  async eliminarAutor(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const autorEliminado = await AutorModel.findByIdAndDelete(id).catch(() => null);
    return autorEliminado;
  }
}
