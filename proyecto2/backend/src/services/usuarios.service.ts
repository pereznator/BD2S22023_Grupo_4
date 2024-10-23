import UsuarioModel from "../schemas/usuario.schema"; // Asegúrate de tener este modelo configurado
import { Types } from "mongoose";

export interface UsuariosQuery {
  fechaInicio?: string;
  fechaFin?: string;
}

export class UsuarioService {

  async crearUsuario(nombre: string, apellido: string, email: string) {
    const nuevoUsuario = new UsuarioModel({ nombre, apellido, email, fecha_registro: new Date() });
    const usuarioGuardado = await nuevoUsuario.save().catch(() => null);
    return usuarioGuardado;
  }

  async obtenerUsuarioPorEmail(email: string) {
    const usuario = await UsuarioModel.findOne({ email }).catch(() => null);
    return usuario;
  }

  async obtenerUsuarios(query: UsuariosQuery) {
    const filter = {};
    if (query.fechaInicio && query.fechaFin) {
      filter["fecha_registro"] = { $gte: new Date(query.fechaInicio), $lte: new Date(query.fechaFin) };
    } else if (query.fechaInicio) {
      filter["fecha_registro"] = { $gte: new Date(query.fechaInicio) };
    } else if (query.fechaFin) {
      filter["fecha_registro"] = { $lte: new Date(query.fechaFin) };
    }
    const usuarios = await UsuarioModel.find(filter).catch(() => null);
    return usuarios;
  }

  async obtenerUsuarioPorId(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const usuario = await UsuarioModel.findById(id).catch(() => null);
    return usuario;
  }

  async actualizarUsuario(id: string, nombre: string, apellido: string, email: string, fecha_registro: Date) {
    if (!Types.ObjectId.isValid(id)) return null;
    const usuarioActualizado = await UsuarioModel.findByIdAndUpdate(
      id,
      { nombre, apellido, email, fecha_registro },
      { new: true }
    ).catch(() => null);
    return usuarioActualizado;
  }

  async eliminarUsuario(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    const usuarioEliminado = await UsuarioModel.findByIdAndDelete(id).catch(() => null);
    return usuarioEliminado;
  }

  async contarUsuarios() {
    const totalUsuarios = await UsuarioModel.countDocuments().catch(() => null);
    return totalUsuarios
  }
  
}
