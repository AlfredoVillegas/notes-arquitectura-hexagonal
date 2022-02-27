import { Request, Response } from 'express';
import { NoteFinderById } from '../../../Modules/Notes/application/NoteFinderById';
import { Controller } from '../Controller';

export class NoteFinderByIdGetController implements Controller {
  constructor(private noteFinder: NoteFinderById) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const note = await this.noteFinder.run(id);

      res.status(200).json(note.toPrimitives());
    } catch (err: any) {
      res.status(404).json({ errorMessage: err.message });
    }
  }
}
