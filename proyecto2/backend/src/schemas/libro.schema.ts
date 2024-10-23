import { Schema, Document, Model, Types } from "mongoose";
import { MongoService } from '../services/mongo.service';  // Servicio que maneja la conexión a MongoDB

// Interfaz para el documento de libros
interface ILibro extends Document {
  titulo: string;
  autor_id: Types.ObjectId;
  anio_publicacion: number;
  genero: string;
  disponibilidad: boolean;
}

// Obtener la instancia de Mongoose a través de MongoService
const mongoose = MongoService.getInstance().getMongoose();

// Definir el esquema de libros
const libroSchema = new Schema<ILibro>({
  titulo: { type: String, required: true },
  autor_id: { type: Schema.Types.ObjectId, ref: 'autores', required: true },  // Referencia a la colección de autores
  anio_publicacion: { type: Number, required: true },
  genero: { type: String, required: true },
  disponibilidad: { type: Boolean, default: true }
});

// Crear el modelo basado en el esquema de libros
const LibroModel: Model<ILibro> = mongoose.model<ILibro>('libros', libroSchema);

export default LibroModel;
