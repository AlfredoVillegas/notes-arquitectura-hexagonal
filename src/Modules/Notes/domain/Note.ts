import { Entity } from '../../Shared/domain/Entity';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { NoteBody } from './NoteBody';
import { NoteCreatedDomainEvent } from './NoteCreatedDomainEvent';
import { NoteId } from './NoteId';
import { NoteTitle } from './NoteTitle';

export class Note extends Entity {
  readonly id: NoteId;
  readonly userCreatorId: Uuid;
  private body: NoteBody;
  private title: NoteTitle;

  constructor(id: NoteId, userCreator: Uuid, body: NoteBody, title: NoteTitle) {
    super();
    this.id = id;
    this.userCreatorId = userCreator;
    this.body = body;
    this.title = title;
  }

  static create(userCreator: Uuid, body: NoteBody, title: NoteTitle) {
    const noteId = Uuid.random();
    const note = new Note(noteId, userCreator, body, title);

    note.addDomainEvent(new NoteCreatedDomainEvent(noteId.value, title.value, userCreator.value));

    return note;
  }

  public editBody(newBody: NoteBody) {
    this.body = newBody;
  }
  public editTitle(newTitle: NoteTitle) {
    this.title = newTitle;
  }
}
