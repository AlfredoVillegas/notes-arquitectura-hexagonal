import { DomainEvent } from './DomainEvent';
import { DomainEventReceiver } from './DomainEventReceiver';

export interface EventBus {
  addSubscribe(receiver: DomainEventReceiver): void;
  unsubscribe(receiver: DomainEventReceiver): void;
  publish(events: DomainEvent[]): Promise<void>;
}
