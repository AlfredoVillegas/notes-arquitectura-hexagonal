import { DomainEvent } from './DomainEvent';
import { DomainEventNameType } from './DomainEventNameType';

export interface DomainEventReceiver {
  receive(domainEvent: DomainEvent): void;
  susbcribedTo(): DomainEventNameType[];
}
