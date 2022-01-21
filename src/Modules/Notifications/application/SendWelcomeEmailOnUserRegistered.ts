import { DomainEventReceiver } from '../../Shared/domain/DomainEventReceiver';
import { UserRegisterDomainEvent } from '../../User/domain/UserRegisterDomainEvent';

import { SendWelcomeEmail } from './SendWelcomeEmail';

export class SendWelcomeEmailOnUserRegistered implements DomainEventReceiver<UserRegisterDomainEvent> {
  constructor(private sendWelcomeEmail: SendWelcomeEmail) {}
  receive(domainEvent: UserRegisterDomainEvent): void {
    this.sendWelcomeEmail.run(domainEvent.email, 'example@empresa.com');
  }
  susbcribedTo(): string[] {
    return ['user.register'];
  }
}
