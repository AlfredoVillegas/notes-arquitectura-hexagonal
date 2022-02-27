import { NextFunction, Request, Response, Router } from 'express';
import { NoteCreator } from '../../Modules/Notes/application/NoteCreator';
import { NoteDeleter } from '../../Modules/Notes/application/NoteDeleter';
import { NoteFinderById } from '../../Modules/Notes/application/NoteFinderById';
import { NoteUpdater } from '../../Modules/Notes/application/NoteUpdater';
import { FakeNoteRepository } from '../../Modules/Notes/infrastructure/fakeNoteRepository';
import { EventBus } from '../../Modules/Shared/domain/EventBus';
import { NoteDeleteController } from '../controllers/note/NoteDeleteController';
import { NoteFinderByIdGetController } from '../controllers/note/NoteFinderByIdGetController';
import { NotePostController } from '../controllers/note/NotePostController';
import { NotePutController } from '../controllers/note/notePutControler';
import { verifyUserIsAuthenticated } from '../middelwares/VerifyUserIsAuthenticated';

/*function initConnectionsTypeOrm(): Repository {
  console.log(`Init: get TypeOrm Repository for Note`);
  return getConnection().getCustomRepository();
}*/

export function registerRoutersNotes(eventBus: EventBus): Router {
  const fakeNoteRepository = new FakeNoteRepository();

  const routersNotes = Router();
  //middelwares
  routersNotes.use((req: Request, res: Response, next: NextFunction) => verifyUserIsAuthenticated(req, res, next));

  const notesCreator = new NoteCreator(fakeNoteRepository, eventBus);
  const notesPostController = new NotePostController(notesCreator);
  routersNotes.post('/notes/', (req: Request, res: Response) => notesPostController.run(req, res));

  const noteUpdater = new NoteUpdater(fakeNoteRepository);
  const notePutController = new NotePutController(noteUpdater);
  routersNotes.put('/notes/:id', (req: Request, res: Response) => notePutController.run(req, res));

  const noteFinderById = new NoteFinderById(fakeNoteRepository);
  const userFinderByIdController = new NoteFinderByIdGetController(noteFinderById);
  routersNotes.get('/users/:id', (req: Request, res: Response) => userFinderByIdController.run(req, res));

  const noteDeleter = new NoteDeleter(fakeNoteRepository);
  const noteDeleteController = new NoteDeleteController(noteDeleter);
  routersNotes.delete('/users/:id', (req: Request, res: Response) => noteDeleteController.run(req, res));

  return routersNotes;
}
