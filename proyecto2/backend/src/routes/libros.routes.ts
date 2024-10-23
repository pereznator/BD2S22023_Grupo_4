import { Router } from "express";
import {
  crearLibroController,
  obtenerLibrosController,
  obtenerLibroPorIdController,
  actualizarLibroController,
  eliminarLibroController,
  obtenerLibrosMasRecientes
} from "../controllers/libros.controller";

const librosRouter = Router();

librosRouter.post("/", crearLibroController); // Crear un libro
librosRouter.get("/", obtenerLibrosController); // Obtener todos los libros
librosRouter.get("/recientes", obtenerLibrosMasRecientes); // Obtener todos los libros
librosRouter.get("/:id", obtenerLibroPorIdController); // Obtener un libro por ID
librosRouter.put("/:id", actualizarLibroController); // Actualizar un libro
librosRouter.delete("/:id", eliminarLibroController); // Eliminar un libro

export default librosRouter;
