import { Entity } from '../../Shared/domain/Entity';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { NoteBody } from './NoteBody';
import { NoteCreatedDomainEvent } from './NoteCreatedDomainEvent';
import { NoteId } from './NoteId';
import { NoteTitle } from './NoteTitle';

export class Note extends Entity {
  readonly id: NoteId;
  readonly creatorUserId: Uuid;
  private body: NoteBody;
  private title: NoteTitle;

  constructor(id: NoteId, userCreator: Uuid, body: NoteBody, title: NoteTitle) {
    super();
    this.id = id;
    this.creatorUserId = userCreator;
    this.body = body;
    this.title = title;
  }

  static create(id: NoteId, userCreator: Uuid, body: NoteBody, title: NoteTitle): Note {
    const note = new Note(id, userCreator, body, title);

    note.addDomainEvent(new NoteCreatedDomainEvent(id.value, title.value, userCreator.value));

    return note;
  }

  public update(bodyNew: NoteBody, titleNew: NoteTitle) {
    this.body = bodyNew;
    this.title = titleNew;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      creatorUserId: this.creatorUserId.value,
      title: this.title.value,
      body: this.body.value
    };
  }
}
