import { DomainEventNameType } from '../../Shared/domain/DomainEventNameType';
import { DomainEventReceiver } from '../../Shared/domain/DomainEventReceiver';
import { UserRegisterDomainEvent } from '../../User/domain/UserRegisterDomainEvent';

import { SendWelcomeEmail } from './SendWelcomeEmail';

export class SendWelcomeEmailOnUserRegistered implements DomainEventReceiver<UserRegisterDomainEvent> {
  constructor(private sendWelcomeEmail: SendWelcomeEmail) {}
  receive(domainEvent: UserRegisterDomainEvent): void {
    this.sendWelcomeEmail.run(domainEvent.email, 'example@empresa.com', domainEvent.name);
  }
  susbcribedTo(): DomainEventNameType[] {
    return [UserRegisterDomainEvent.EVENT_NAME];
  }
}
