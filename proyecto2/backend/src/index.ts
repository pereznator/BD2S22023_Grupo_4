import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import LibroRouter from "./routes/libros.routes"
import autorRouter from "./routes/autores.routes"
import usuarioRouter from "./routes/usuarios.routes"

dotenv.config();
const port = process.env.PORT || 3000;

const app: Application = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Declarar rutas
app.use("/libros", LibroRouter);
app.use("/autores", autorRouter);
app.use("/usuarios", usuarioRouter);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
