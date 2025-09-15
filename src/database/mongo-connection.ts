import mongoose from 'mongoose';

export class MongoConnection {
  private static instance: MongoConnection;
  private uri: string;

  private constructor() {
    this.uri =
      process.env.MONGO_URI ||
      'mongodb://root:example@localhost:27017/projectleak?authSource=admin';
  }

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log('MongoDB conectado!');
    } catch (err) {
      console.error('Erro ao conectar MongoDB:', err);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('MongoDB desconectado!');
    } catch (err) {
      console.error('Erro ao desconectar MongoDB:', err);
    }
  }
}
