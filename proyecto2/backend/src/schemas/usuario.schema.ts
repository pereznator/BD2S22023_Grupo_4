import { Schema, Document, Model } from "mongoose";
import { MongoService } from '../services/mongo.service';

// Interfaz para el documento de usuarios
interface IUsuario extends Document {
  nombre: string;
  apellido: string;
  email: string;
  fecha_registro: Date;
}

// Obtener la instancia de Mongoose
const mongoose = MongoService.getInstance().getMongoose();

// Definir el esquema de usuarios
const usuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fecha_registro: { type: Date, default: Date.now }
});

// Crear el modelo basado en el esquema de usuarios
const UsuarioModel: Model<IUsuario> = mongoose.model<IUsuario>('usuarios', usuarioSchema);

export default UsuarioModel;
