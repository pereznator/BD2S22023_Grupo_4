import { Request, Response } from "express";
import { UsuarioService, UsuariosQuery } from "../services/usuarios.service";
import { validarQueryParams } from "../utils";

const usuarioService = new UsuarioService();

// Crear un nuevo usuario
export async function crearUsuarioController(req: Request, res: Response): Promise<any> {
  try {
    const { nombre, apellido, email } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: "El nombre del usuario es requerido" });
    }
    if (!apellido) {
      return res.status(400).json({ message: "El apellido del usuario es requerido" });
    }
    if (!email) {
      return res.status(400).json({ message: "El email del usuario es requerido" });
    }

    const usuarioExistente = await usuarioService.obtenerUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const nuevoUsuario = await usuarioService.crearUsuario(nombre, apellido, email);

    if (!nuevoUsuario) {
      return res.status(400).json({ message: "No se pudo crear el usuario" });
    }

    res.status(201).json(nuevoUsuario);
  } catch (error: Error | any) {
    console.error("Error en crearUsuarioController:", error);
    res.status(500).json({ message: `Error al crear el usuario: ${error.message}` });
  }
}

// Obtener todos los usuarios
export async function obtenerUsuariosController(req: Request, res: Response): Promise<any> {
  try {
    const { fechaInicio, fechaFin } = req.query;
    const query: UsuariosQuery = {};
    if (validarQueryParams(fechaInicio)) {
      query.fechaInicio = fechaInicio.toString();
    }
    if (validarQueryParams(fechaFin)) {
      query.fechaFin = fechaFin.toString();
    }
    const usuarios = await usuarioService.obtenerUsuarios(query);

    if (!usuarios) {
      return res.status(500).json({ message: "Error al obtener los usuarios" });
    }

    res.status(200).json(usuarios);
  } catch (error: Error | any) {
    console.error("Error en obtenerUsuariosController:", error);
    res.status(500).json({ message: `Error al obtener los usuarios: ${error.message}` });
  }
}

// Obtener un usuario por ID
export async function obtenerUsuarioPorIdController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.obtenerUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error: Error | any) {
    console.error("Error en obtenerUsuarioPorIdController:", error);
    res.status(500).json({ message: `Error al obtener el usuario: ${error.message}` });
  }
}

// Actualizar un usuario
export async function actualizarUsuarioController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, fecha_registro } = req.body;

    const usuarioActualizado = await usuarioService.actualizarUsuario(id, nombre, apellido, email, fecha_registro);

    if (!usuarioActualizado) {
      return res.status(400).json({ message: "No se pudo actualizar el usuario" });
    }

    res.status(200).json(usuarioActualizado);
  } catch (error: Error | any) {
    console.error("Error en actualizarUsuarioController:", error);
    res.status(500).json({ message: `Error al actualizar el usuario: ${error.message}` });
  }
}

// Eliminar un usuario
export async function eliminarUsuarioController(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const usuarioEliminado = await usuarioService.eliminarUsuario(id);

    if (!usuarioEliminado) {
      return res.status(400).json({ message: "No se pudo eliminar el usuario" });
    }

    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error: Error | any) {
    console.error("Error en eliminarUsuarioController:", error);
    res.status(500).json({ message: `Error al eliminar el usuario: ${error.message}` });
  }
}


export async function contarUsuariosController(req: Request, res: Response): Promise<any> {
  try {
    const totalUsuarios = await usuarioService.contarUsuarios();

    if (!totalUsuarios) {
      return res.status(500).json({ message: "Error al contar los usuarios" });
    }

    res.status(200).json({ totalUsuarios });
  } catch (error: Error | any) {
    console.error("Error en contarUsuariosController:", error);
    res.status(500).json({ message: `Error al contar los usuarios: ${error.message}` });
  }
}