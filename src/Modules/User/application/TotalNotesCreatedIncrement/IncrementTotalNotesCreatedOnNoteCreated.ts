import { DomainEventReceiver } from '../../../Shared/domain/DomainEventReceiver';
import { NoteCreatedDomainEvent } from './NoteCreatedDomainEvent';
import { TotalNotesCreatedIncrementer } from './TotalNotesCreatedIncrementer';

export class IncrementTotalNotesCreatedOnNoteCreated implements DomainEventReceiver<NoteCreatedDomainEvent> {
  constructor(private incrementerService: TotalNotesCreatedIncrementer) {}

  receive(domainEvent: NoteCreatedDomainEvent): void {
    this.incrementerService.run(domainEvent.noteCreatorId);
  }
  susbcribedTo(): string[] {
    return [NoteCreatedDomainEvent.EVENT_NAME];
  }
}
