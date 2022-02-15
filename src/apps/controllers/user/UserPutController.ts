import { Request, Response } from 'express';
//import httpStatus from 'http-status';
import { UserRegister } from '../../../Modules/User/application/UserRegister';
import { Controller } from '../Controller';
/*
type UserPutRequest = Request & {
  body: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
};
*/

export class UserPutCrontroller implements Controller {
  constructor(private userRegister: UserRegister) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, email, password } = req.body;
      await this.userRegister.run({ id, name, email, password });
      res.status(201).json({ id, name, password, email });
    } catch (err: any) {
      //res.status(400).send(err.message);
      res.status(400).json({
        error: err.message
      });
    }
  }
}
