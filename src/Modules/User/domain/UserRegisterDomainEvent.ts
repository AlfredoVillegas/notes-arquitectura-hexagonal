import { DomainEvent } from '../../Shared/domain/DomainEvent';

export class UserRegisterDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'user.register';
  readonly userName: string;
  readonly email: string;

  constructor(aggregateId: string, email: string, name: string, eventId?: string, ocurredOn?: Date) {
    super(UserRegisterDomainEvent.EVENT_NAME, aggregateId, eventId, ocurredOn);
    this.userName = name;
    this.email = email;
  }
}
