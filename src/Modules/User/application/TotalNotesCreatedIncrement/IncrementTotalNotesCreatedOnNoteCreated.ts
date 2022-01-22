import { NoteCreatedDomainEvent } from '../../../Notes/domain/NoteCreatedDomainEvent';
import { DomainEventReceiver } from '../../../Shared/domain/DomainEventReceiver';
import { TotalNotesCreatedIncrementer } from './TotalNotesCreatedIncrementer';

export class IncrementTotalNotesCreatedOnNoteCreated implements DomainEventReceiver<NoteCreatedDomainEvent> {
  constructor(private incrementer: TotalNotesCreatedIncrementer) {}

  receive(domainEvent: NoteCreatedDomainEvent): void {
    this.incrementer.run(domainEvent.noteCreatorId);
  }
  susbcribedTo(): string[] {
    return [NoteCreatedDomainEvent.EVENT_NAME];
  }
}
