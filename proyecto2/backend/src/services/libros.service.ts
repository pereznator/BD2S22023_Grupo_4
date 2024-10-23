import LibroModel from "../schemas/libro.schema"; // Asegúrate de tener este modelo ya configurado
import { Types } from "mongoose";

export interface LibrosQuery {
  genero?: string;
  anio_inicio?: number;
  anio_fin?: number;
  autor?: string;
  titulo?: string;
  disponibilidad?: boolean;
}

export class LibroService {
  
  async crearLibro(titulo: string, autor_id: Types.ObjectId, anio_publicacion: number, genero: string, disponibilidad: boolean) {
    const nuevoLibro = new LibroModel({ titulo, autor_id, anio_publicacion, genero, disponibilidad });
    const libroGuardado = await nuevoLibro.save().catch(() => null);
    return libroGuardado;
  }

  async obtenerLibros(query: LibrosQuery) {
    const pipeline: any[] = [];

    // Filtro por género (regex)
    if (query.genero) {
      pipeline.push({
        $match: { genero: { $regex: query.genero, $options: "i" } },
      });
    }

    // Filtro por año de publicación (rango)
    if (query.anio_inicio && query.anio_fin) {
      pipeline.push({
        $match: { anio_publicacion: { $gte: query.anio_inicio, $lte: query.anio_fin } },
      });
    } else if (query.anio_inicio) {
      pipeline.push({
        $match: { anio_publicacion: { $gte: query.anio_inicio } },
      });
    } else if (query.anio_fin) {
      pipeline.push({
        $match: { anio_publicacion: { $lte: query.anio_fin } },
      });
    }

    // Filtro por autor (id o nombre con regex)
    if (query.autor) {
      pipeline.push({
        $lookup: {
          from: "autores", // nombre de la colección de autores
          localField: "autor_id", // campo que referencia al autor en la colección de libros
          foreignField: "_id", // campo _id en la colección de autores
          as: "autor", // resultado del lookup se almacenará en "autor"
        },
      });
      pipeline.push({
        $match: {
          "autor.nombre": { $regex: query.autor, $options: "i" }, // Puedes usar nombre o apellido del autor aquí
        },
      });
    }

    // Filtro por título (regex)
    if (query.titulo) {
      pipeline.push({
        $match: { titulo: { $regex: query.titulo, $options: "i" } },
      });
    }

    // Filtro por disponibilidad
    if (typeof query.disponibilidad !== "undefined") {
      pipeline.push({
        $match: { disponibilidad: query.disponibilidad },
      });
    }

    // Lookup para traer los datos del autor
    pipeline.push({
      $lookup: {
        from: "autores", // nombre de la colección de autores
        localField: "autor_id", // campo en la colección de libros
        foreignField: "_id", // campo _id de la colección de autores
        as: "autor", // nombre del campo donde se pondrán los datos del autor
      },
    });

    // Eliminar el campo autor_id y dejar solo la información del autor en la respuesta
    pipeline.push({
      $project: {
        titulo: 1,
        anio_publicacion: 1,
        genero: 1,
        disponibilidad: 1,
        autor: { $arrayElemAt: ["$autor", 0] }, // Convertir autor en un objeto en lugar de array
      },
    });

    // Ejecutar el pipeline
    const libros = await LibroModel.aggregate(pipeline);

    return libros;
  }

  async obtenerLibroPorId(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const libro = await LibroModel.findById(id).populate("autor_id");
    return libro;
  }

  async actualizarLibro(id: string, titulo: string, autor_id: Types.ObjectId, anio_publicacion: number, genero: string, disponibilidad: boolean) {
    if (!Types.ObjectId.isValid(id)) return null;
    const libroActualizado = await LibroModel.findByIdAndUpdate(
      id,
      { titulo, autor_id, anio_publicacion, genero, disponibilidad },
      { new: true }
    ).catch(() => null);
    return libroActualizado;
  }

  async eliminarLibro(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const libroEliminado = await LibroModel.findByIdAndDelete(id).catch(() => null);
    return libroEliminado;
  }

  async buscarLibrosPorGenero(genero: string) {
    const libros = await LibroModel.find({ genero: { $regex: genero, $options: "i" } }).populate("autor_id");
    return libros;
  }

  async librosMasRecientes() {
    const libros = await LibroModel.aggregate([
      {
        $lookup: {
          from: "autores", // nombre de la colección de autores
          localField: "autor_id", // campo en la colección de libros
          foreignField: "_id", // campo _id de la colección de autores
          as: "autor", // nombre del campo donde se pondrán los datos del autor
        },
      },
      {
        $sort: { anio_publicacion: -1 }
      },
      {
        $limit: 5
      }
    ])
    return libros;
  }

  async eliminarLibrosPorAutor(autorId: string): Promise<any> {
    if (!Types.ObjectId.isValid(autorId)) return null;
    const librosEliminados = await LibroModel.deleteMany({ autor_id: autorId }).catch(() => null);
    return librosEliminados;
  }
}

