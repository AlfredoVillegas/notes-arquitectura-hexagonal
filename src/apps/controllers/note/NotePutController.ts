import { Request, Response } from 'express';
import { NoteCreator } from '../../../Modules/Notes/application/NoteCreator';
import { Controller } from '../Controller';

export class NotePutController implements Controller {
  constructor(private noteCreator: NoteCreator) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const { body, title } = req.body;
      const { id, userId } = req.params;

      await this.noteCreator.run(id, body, title, userId);

      res.status(201).json({ id, body, title, userId });
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    }
  }
}
