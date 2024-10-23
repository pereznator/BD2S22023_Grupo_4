import mongoose from "mongoose";

export class MongoService {
  private static instance: MongoService;
  private uri = process.env.MONGO_URI || "mongodb://mongo:27017/bases2";

  private constructor() {
    this.connect();
  }

  public static getInstance(): MongoService {
    if (!MongoService.instance) {
      MongoService.instance = new MongoService();
    }
    return MongoService.instance;
  }

  private connect() {
    mongoose.connect(this.uri)
      .then(() => console.log("Conexión establecida con MongoDB"))
      .catch((err) => console.error("Error al conectar a MongoDB", err));
  }

  public getMongoose() {
    return mongoose;
  }
}
