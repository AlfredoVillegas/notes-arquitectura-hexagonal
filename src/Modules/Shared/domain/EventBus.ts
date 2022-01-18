import { ReceiverEvent } from './ReceiverEvent';

export interface EventBus {
  addSubscribe(topic: string, receiver: ReceiverEvent): void;
  unsubscribe(topic: string, receiver: ReceiverEvent): void;
  publish(topic: string, subject: string): Promise<void>;
}
