export interface ReceiverEvent {
  receive(topic: string, subject: String): void;
}
