import express, { Application } from 'express';
import cors from 'cors';
import { registerRouterUser } from './routes/user.route';
import { EventBus } from '../Modules/Shared/domain/EventBus';
import { registerRoutersNotes } from './routes/note.router';
import { registerAuthRouters } from './routes/auth.router';

class Server {
  private app: Application;
  private port: string;
  private apiPath = '/api';
  private eventBus: EventBus;
  /*private apiPaths = {
    usuarios: '/api/usuarios'
  }*/
  constructor(eventBus: EventBus) {
    this.app = express();
    this.port = process.env.Port || '8000';
    this.eventBus = eventBus;
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.apiPath, registerRouterUser(this.eventBus));
    this.app.use(this.apiPath, registerRoutersNotes(this.eventBus));
    this.app.use(this.apiPath, registerAuthRouters());
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App is running at http://localhost:${this.port}/api `);
      console.log(' Press CTRL-C to stop\n');
    });
  }
}

export default Server;
