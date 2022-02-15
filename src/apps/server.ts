import express, { Application } from 'express';
import cors from 'cors';
import { registerRouterUser } from './routes/user.route';

class Server {
  private app: Application;
  private port: string;
  private apiPath = '/api';
  /*private apiPaths = {
    usuarios: '/api/usuarios'
  }*/
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPath, registerRouterUser());
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App is running at http://localhost:${this.port}/api `);
      console.log(' Press CTRL-C to stop\n');
    });
  }
}

export default Server;
