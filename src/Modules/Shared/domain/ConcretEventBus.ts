import { textChangeRangeIsUnchanged } from 'typescript';
import { EventBus } from './EventBus';
import { ReceiverEvent } from './ReceiverEvent';

export class ConcretEventBus implements EventBus {
  private receivers: { [key: string]: ReceiverEvent[] };

  constructor(public triesCount: number = 3) {
    this.receivers = {};
  }

  public addSubscribe(topic: string, receiver: ReceiverEvent): void {
    if (!this.receivers[topic]) {
      this.receivers[topic] = [];
    }
    this.receivers[topic].push(receiver);
  }
  public unsubscribe(topic: string, receiver: ReceiverEvent): void {
    if (this.receivers[topic]) {
      this.receivers[topic] = this.receivers[topic].filter(item => item !== receiver);
    }
  }

  public async publish(topic: string, subject: string): Promise<void> {
    const receivers = this.getTopicReceivers(topic);
    receivers.map(receiver => receiver.receive(topic, subject));
  }

  private getTopicReceivers(topic: string): ReceiverEvent[] {
    if (this.receivers[topic]) {
      return this.receivers[topic];
    } else {
      return [];
    }
  }
}
