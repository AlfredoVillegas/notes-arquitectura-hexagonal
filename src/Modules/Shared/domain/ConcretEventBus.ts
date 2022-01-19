import e from 'cors';
import { textChangeRangeIsUnchanged } from 'typescript';
import { DomainEvent } from './DomainEvent';
import { EventBus } from './EventBus';
import { ReceiverEvent } from './ReceiverEvent';

export class ConcretEventBus implements EventBus {
  private receiversMaps: { [key: string]: ReceiverEvent[] };

  constructor(public triesCount: number = 3) {
    this.receiversMaps = {};
  }

  public addSubscribe(topic: string, receiver: ReceiverEvent): void {
    if (!this.receiversMaps[topic]) {
      this.receiversMaps[topic] = [];
    }
    this.receiversMaps[topic].push(receiver);
  }
  public unsubscribe(topic: string, receiver: ReceiverEvent): void {
    if (this.receiversMaps[topic]) {
      this.receiversMaps[topic] = this.receiversMaps[topic].filter(item => item !== receiver);
    }
  }

  public async publish(events: DomainEvent[]): Promise<void> {
    for (let event of events) {
      let receivers: ReceiverEvent[] = this.getTopicReceivers(event.eventName);

      receivers.map(receiver => receiver.receive(event.eventName, event.aggregateId));
    }

    //receivers.map(receiver => receiver.receive('22', subject));
  }

  private getTopicReceivers(topic: string): ReceiverEvent[] {
    if (this.receiversMaps[topic]) {
      return this.receiversMaps[topic];
    } else {
      return [];
    }
  }
}
