import { Router } from "express";
import {
  crearUsuarioController,
  obtenerUsuariosController,
  obtenerUsuarioPorIdController,
  actualizarUsuarioController,
  eliminarUsuarioController,
  contarUsuariosController
} from "../controllers/usuarios.controller";

const usuariosRouter = Router();

usuariosRouter.post("/", crearUsuarioController); // Crear un usuario
usuariosRouter.get("/", obtenerUsuariosController); // Obtener todos los usuarios
usuariosRouter.get("/total", contarUsuariosController); // Obtener todos los usuarios
usuariosRouter.get("/:id", obtenerUsuarioPorIdController); // Obtener un usuario por ID
usuariosRouter.put("/:id", actualizarUsuarioController); // Actualizar un usuario
usuariosRouter.delete("/:id", eliminarUsuarioController); // Eliminar un usuario

export default usuariosRouter;
