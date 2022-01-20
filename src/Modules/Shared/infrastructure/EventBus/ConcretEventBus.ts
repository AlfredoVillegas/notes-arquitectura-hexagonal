import { DomainEvent } from '../../domain/DomainEvent';
import { EventBus } from '../../domain/EventBus';
import { DomainEventReceiver } from '../../domain/DomainEventReceiver';

export class ConcretEventBus implements EventBus {
  private receiversMaps: Map<string, DomainEventReceiver[]>;

  constructor(public triesCount: number = 3) {
    this.receiversMaps = new Map();
  }

  public addSubscribe(receiver: DomainEventReceiver): void {
    const eventsNames = receiver.susbcribedTo();
    eventsNames.map(eventName => this.subscribe(eventName, receiver));
  }

  private subscribe(eventName: string, receiver: DomainEventReceiver): void {
    const eventsRegistered = this.receiversMaps.get(eventName);
    if (eventsRegistered) {
      eventsRegistered.push(receiver);
      this.receiversMaps.set(eventName, eventsRegistered);
    } else {
      this.receiversMaps.set(eventName, [receiver]);
    }
  }

  public unsubscribe(receiver: DomainEventReceiver) {
    const eventsNames = receiver.susbcribedTo();

    for (let eventName of eventsNames) {
      let eventsRegistered = this.receiversMaps.get(eventName);

      if (eventsRegistered) {
        eventsRegistered = eventsRegistered.filter(event => event !== receiver);
        this.receiversMaps.set(eventName, eventsRegistered);
      }
    }
  }

  public async publish(events: DomainEvent[]): Promise<void> {
    for (let event of events) {
      const receivers = this.receiversMaps.get(event.eventName);
      if (receivers) {
        receivers.map(receiver => receiver.receive(event));
      }
    }
  }
}
