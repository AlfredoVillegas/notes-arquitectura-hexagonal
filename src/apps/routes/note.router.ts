import { NextFunction, Request, Response, Router } from 'express';
import { NoteCreator } from '../../Modules/Notes/application/NoteCreator';
import { FakeNoteRepository } from '../../Modules/Notes/infrastructure/fakeNoteRepository';
import { EventBus } from '../../Modules/Shared/domain/EventBus';
import { NotePutController } from '../controllers/note/NotePutController';
import { verifyUserIsAuthenticated } from '../middelwares/VerifyUserIsAuthenticated';

/*function initConnectionsTypeOrm(): Repository {
  console.log(`Init: get TypeOrm Repository for Note`);
  return getConnection().getCustomRepository();
}*/

export function registerRoutersNotes(eventBus: EventBus): Router {
  const fakeNoteRepository = new FakeNoteRepository();

  const routersNotes = Router();

  const notesCreator = new NoteCreator(fakeNoteRepository, eventBus);
  const notesPutController = new NotePutController(notesCreator);
  routersNotes.put(
    '/notes/:id',
    (req: Request, res: Response, next: NextFunction) => verifyUserIsAuthenticated(req, res, next),
    (req: Request, res: Response) => notesPutController.run(req, res)
  );

  return routersNotes;
}
