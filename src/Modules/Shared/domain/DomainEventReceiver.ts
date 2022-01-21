import { DomainEvent } from './DomainEvent';
import { DomainEventNameType } from './DomainEventNameType';

export interface DomainEventReceiver<T extends DomainEvent> {
  receive(domainEvent: DomainEvent): void;
  susbcribedTo(): DomainEventNameType[];
}
