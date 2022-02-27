import { Request, Response } from 'express';
import { NoteUpdater } from '../../../Modules/Notes/application/NoteUpdater';
import { Controller } from '../Controller';

export class NotePutController implements Controller {
  constructor(private noteUpdater: NoteUpdater) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { body, title } = req.body;
      const { id } = req.params;

      await this.noteUpdater.run(id, body, title);

      res.status(201).json({ id, body, title });
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    }
  }
}
