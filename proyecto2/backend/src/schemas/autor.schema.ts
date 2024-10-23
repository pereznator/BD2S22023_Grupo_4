import { Schema, Document, Model } from "mongoose";
import { MongoService } from '../services/mongo.service';

// Interfaz para el documento de autores
interface IAutor extends Document {
  nombre: string;
  apellido: string;
  nacionalidad: string[];
}

// Obtener la instancia de Mongoose
const mongoose = MongoService.getInstance().getMongoose();

// Definir el esquema de autores
const autorSchema = new Schema<IAutor>({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  nacionalidad: { type: [String], required: true }
});

// Crear el modelo basado en el esquema de autores
const AutorModel: Model<IAutor> = mongoose.model<IAutor>('autores', autorSchema);

export default AutorModel;
