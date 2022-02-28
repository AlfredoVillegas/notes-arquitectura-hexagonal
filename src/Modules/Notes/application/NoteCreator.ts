import { EventBus } from '../../Shared/domain/EventBus';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { Note } from '../domain/Note';
import { NoteBody } from '../domain/NoteBody';
import { NoteId } from '../domain/NoteId';
import { NoteRepository } from '../domain/NoteRepository';
import { NoteTitle } from '../domain/NoteTitle';

export type Params = {
  body: string;
  title: string;
  userCreator: string;
};

export class NoteCreator {
  private repository: NoteRepository;
  private eventBus: EventBus;

  constructor(repository: NoteRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run({
    id,
    body,
    title,
    creatorUserId
  }: {
    id: string;
    body: string;
    title: string;
    creatorUserId: string;
  }): Promise<void> {
    const creatorUser = new Uuid(creatorUserId);
    const note = Note.create(new NoteId(id), creatorUser, new NoteBody(body), new NoteTitle(title));

    await this.repository.save(note);
    console.log('evento pulicado. nota creada');
    await this.eventBus.publish(note.extractDomainEvents());
  }
}
