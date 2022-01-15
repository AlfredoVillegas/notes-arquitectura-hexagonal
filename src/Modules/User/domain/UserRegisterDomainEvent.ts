import { DomainEvent } from '../../Shared/domain/DomainEvent';

export class UserRegisterDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.register';
  readonly name: string;
  readonly email: string;

  constructor(agregateId: string, email: string, name: string, eventId?: string, ocurredOn?: Date) {
    super(UserRegisterDomainEvent.EVENT_NAME, agregateId, eventId, ocurredOn);
    this.name = name;
    this.email = email;
  }
}
