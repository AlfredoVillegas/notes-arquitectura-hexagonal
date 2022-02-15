import { Request, Response } from 'express';
import { UserDeleter } from '../../../Modules/User/application/UserDeleter';
import { Controller } from '../Controller';

export class UserDeleterCrontroller implements Controller {
  constructor(private userDeleter: UserDeleter) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      await this.userDeleter.run(req.params.id);
      res.status(200).end();
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    }
  }
}
