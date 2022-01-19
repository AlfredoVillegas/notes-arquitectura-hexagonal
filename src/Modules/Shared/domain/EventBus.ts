import { DomainEvent } from './DomainEvent';
import { ReceiverEvent } from './ReceiverEvent';

export interface EventBus {
  addSubscribe(eventName: string, receiver: ReceiverEvent): void;
  unsubscribe(eventName: string, receiver: ReceiverEvent): void;
  publish(events: DomainEvent[]): Promise<void>;
}
