import { Request, Response } from 'express';
import { TotalNotesCreatedIncrementer } from '../../../Modules/User/application/TotalNotesCreatedIncrement/TotalNotesCreatedIncrementer';
import { Controller } from '../Controller';

export class TotalNotasCreatedIncrementerPostController implements Controller {
  constructor(private totalNotesIncrementer: TotalNotesCreatedIncrementer) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      await this.totalNotesIncrementer.run(req.params.id);
      res.status(200).end();
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    }
  }
}
