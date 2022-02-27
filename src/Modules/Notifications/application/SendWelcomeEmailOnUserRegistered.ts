import { DomainEventReceiver } from '../../Shared/domain/DomainEventReceiver';
import { SendWelcomeEmail } from './SendWelcomeEmail';
import { UserRegisterDomainEvent } from './UserRegisterDomainEvent';

export class SendWelcomeEmailOnUserRegistered implements DomainEventReceiver<UserRegisterDomainEvent> {
  constructor(private sendWelcomeEmail: SendWelcomeEmail) {}
  receive(domainEvent: UserRegisterDomainEvent): void {
    this.sendWelcomeEmail.run(domainEvent.email, 'example@empresa.com', domainEvent.userName);
  }
  susbcribedTo(): string[] {
    return [UserRegisterDomainEvent.EVENT_NAME];
  }
}
