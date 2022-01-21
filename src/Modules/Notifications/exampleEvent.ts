import { DomainEvent } from '../Shared/domain/DomainEvent';
import { DomainEventNameType } from '../Shared/domain/DomainEventNameType';
import { DomainEventReceiver } from '../Shared/domain/DomainEventReceiver';
import { UserRegisterDomainEvent } from '../User/domain/UserRegisterDomainEvent';
import { createExample } from './create';

export class exampleEvent implements DomainEventReceiver<UserRegisterDomainEvent> {
  constructor() {
    console.log('exampler Receiver preparado');
  }

  susbcribedTo(): DomainEventNameType[] {
    return ['user.register'];
  }

  receive(domainEvent: UserRegisterDomainEvent): void {
    console.log(`promiximo a lanzar logica Secundario:::: Subjet: ${domainEvent.eventName}}`);
    new createExample(domainEvent.eventName);
  }
}
