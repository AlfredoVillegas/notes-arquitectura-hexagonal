import { Entity } from '../../Shared/domain/Entity';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserTotalNotesCreated } from './UserTotalNotesCreated';
import { UserPassword } from './UserPassword';
import { UserRegisterDomainEvent } from './UserRegisterDomainEvent';

export class User extends Entity {
  readonly id: Uuid;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly isActive: boolean;
  readonly totalNotesCreated: UserTotalNotesCreated;

  constructor(
    id: Uuid,
    name: UserName,
    email: UserEmail,
    password: UserPassword,
    isActive: boolean,
    totalNotesCreated: UserTotalNotesCreated
  ) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.isActive = isActive;
    this.totalNotesCreated = totalNotesCreated;
  }

  static create(id: Uuid, name: UserName, email: UserEmail, password: UserPassword): User {
    const isActive = false;
    const notesCreated = new UserTotalNotesCreated(0);

    const user = new User(id, name, email, password, isActive, notesCreated);

    user.addDomainEvent(new UserRegisterDomainEvent(user.id.value, user.email.value, user.name.value));

    return user;
  }
}
