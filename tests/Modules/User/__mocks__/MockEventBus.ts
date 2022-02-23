import { DomainEvent } from '../../../../src/Modules/Shared/domain/DomainEvent';
import { DomainEventReceiver } from '../../../../src/Modules/Shared/domain/DomainEventReceiver';
import { EventBus } from '../../../../src/Modules/Shared/domain/EventBus';

export class MockEventBus implements EventBus {
  private callsToPublishEvent = 0;

  constructor() {}

  addSubscribe(receiver: DomainEventReceiver<DomainEvent>): void {
    console.log('addSubscribers');
  }
  unsubscribe(receiver: DomainEventReceiver<DomainEvent>): void {
    console.log('unSubscribers');
  }
  publish(events: DomainEvent[]): Promise<void> {
    this.callsToPublishEvent++;
    return Promise.resolve();
  }
  public getCallsToPublishEvent(): number {
    return this.callsToPublishEvent;
  }
}
