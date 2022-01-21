import { DomainEvent } from './DomainEvent';
import { DomainEventReceiver } from './DomainEventReceiver';

export interface EventBus {
  addSubscribe(receiver: DomainEventReceiver<DomainEvent>): void;
  unsubscribe(receiver: DomainEventReceiver<DomainEvent>): void;
  publish(events: DomainEvent[]): Promise<void>;
}
