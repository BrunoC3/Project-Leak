import express from 'express';
import { router } from './router';
import { MongoConnection } from './database/mongo-connection';

class Main {
  private _server: express.Application;

  constructor() {
    this._server = express();
  }

  public async init(port: number) {
    await MongoConnection.getInstance().connect();

    this.middleware();
    this.routes();

    this._server.listen(port, () => console.log(`🚀 Server rodando na porta ${port}`));
  }

  private middleware() {
    this._server.use(express.json());
  }

  private routes() {
    this._server.use(router);
  }

  get server() {
    return this._server;
  }
}

export const main = new Main();
