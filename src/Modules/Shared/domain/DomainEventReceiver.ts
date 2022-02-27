import { DomainEvent } from './DomainEvent';

export interface DomainEventReceiver<T extends DomainEvent> {
  receive(domainEvent: T): void;
  susbcribedTo(): T['eventName'][];
}
