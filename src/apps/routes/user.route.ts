import { NextFunction, Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import { EventBus } from '../../Modules/Shared/domain/EventBus';
import { UserDeleter } from '../../Modules/User/application/UserDeleter';
import { UserFinderById } from '../../Modules/User/application/UserFinderById';
import { UserRegister } from '../../Modules/User/application/UserRegister';
import { BcryptHasher } from '../../Modules/User/infrastructure/BcryptHashing';
import { TypeOrmUserRepository } from '../../Modules/User/infrastructure/persistence/TypeOrmUserRepository';
import { UserDeleterCrontroller } from '../controllers/user/UserDeleterController';
import { UserFinderGetCrontroller } from '../controllers/user/UserFinderByIdGetCrontroller';
import { UserPutCrontroller } from '../controllers/user/UserPutController';
import { verifyUserIsAuthenticated } from '../middelwares/VerifyUserIsAuthenticated';

function initConnectionsTypeOrm(): TypeOrmUserRepository {
  console.log(`Init: get user TypeOrm Repository for User`);
  return getConnection().getCustomRepository(TypeOrmUserRepository);
}

export function registerRouterUser(eventBus: EventBus): Router {
  const userRepository = initConnectionsTypeOrm();

  const routersUser = Router();

  const userRegister = new UserRegister(new BcryptHasher(), userRepository, eventBus);
  const userPutController = new UserPutCrontroller(userRegister);
  routersUser.put(
    '/users/:id',
    (req: Request, res: Response, next: NextFunction) => verifyUserIsAuthenticated(req, res, next),
    (req: Request, res: Response) => userPutController.run(req, res)
  );

  const userFinderById = new UserFinderById(userRepository);
  const userFinderByIdController = new UserFinderGetCrontroller(userFinderById);
  routersUser.get('/users/:id', (req: Request, res: Response) => userFinderByIdController.run(req, res));

  const userDeleter = new UserDeleter(userRepository);
  const userDeleteController = new UserDeleterCrontroller(userDeleter);
  routersUser.delete(
    '/users/:id',
    (req: Request, res: Response, next: NextFunction) => verifyUserIsAuthenticated(req, res, next),
    (req: Request, res: Response) => userDeleteController.run(req, res)
  );

  return routersUser;
}
