import { DomainEvent } from '../Shared/domain/DomainEvent';
import { DomainEventNameType } from '../Shared/domain/DomainEventNameType';
import { DomainEventReceiver } from '../Shared/domain/DomainEventReceiver';
import { createExample } from './create';

export class exampleEvent implements DomainEventReceiver {
  constructor() {
    console.log('exampler Receiver preparado');
  }

  susbcribedTo(): DomainEventNameType[] {
    return ['user.register'];
  }

  receive(domainEvent: DomainEvent): void {
    console.log(`promiximo a lanzar logica Secundario:::: Subjet: ${domainEvent}}`);
    new createExample(domainEvent.eventName);
  }
}
