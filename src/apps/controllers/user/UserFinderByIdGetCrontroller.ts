import { Request, Response } from 'express';
import { UserFinderById } from '../../../Modules/User/application/UserFinderById';
import { Controller } from '../Controller';

export class UserFinderGetCrontroller implements Controller {
  constructor(private userFinder: UserFinderById) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userFinder.run(id);

      res.status(200).json(user.toPrimitives());
    } catch (err: any) {
      res.status(404).json({ errorMessage: err.message });
    }
  }
}
