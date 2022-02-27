import { Request, Response } from 'express';
import { NoteDeleter } from '../../../Modules/Notes/application/NoteDeleter';
import { Controller } from '../Controller';

export class NoteDeleteController implements Controller {
  constructor(private noteDeleter: NoteDeleter) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.noteDeleter.run(id);
      res.status(201).json({ id });
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    }
  }
}
