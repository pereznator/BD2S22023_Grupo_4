import { Router } from "express";
import {
  crearAutorController,
  obtenerAutoresController,
  obtenerAutorPorIdController,
  actualizarAutorController,
  eliminarAutorController
} from "../controllers/autores.controller";

const autoresRouter = Router();

autoresRouter.post("/", crearAutorController); // Crear un autor
autoresRouter.get("/", obtenerAutoresController); // Obtener todos los autores
autoresRouter.get("/:id", obtenerAutorPorIdController); // Obtener un autor por ID
autoresRouter.put("/:id", actualizarAutorController); // Actualizar un autor
autoresRouter.delete("/:id", eliminarAutorController); // Eliminar un autor

export default autoresRouter;
