import { DomainEvent } from '../../Shared/domain/DomainEvent';

export class NoteCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'note.create';
  readonly noteTitle: string;
  readonly noteCreatorId: string;

  constructor(aggregateId: string, noteTitle: string, noteCreator: string, eventId?: string, ocurredOn?: Date) {
    super(NoteCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, ocurredOn);
    this.noteTitle = noteTitle;
    this.noteCreatorId = noteCreator;
  }
}
