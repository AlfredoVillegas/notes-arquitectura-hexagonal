import { Request, Response, Router } from 'express';
import { loginPostController } from '../controllers/auth/LoginPostController';
import { verifyUserIsAuthenticated } from '../middelwares/VerifyUserIsAuthenticated';

export function registerAuthRouters(): Router {
  const routersAuth = Router();

  routersAuth.post('/auth/login', (req: Request, res: Response) => loginPostController(req, res));

  return routersAuth;
}
