import { Entity } from '../../Shared/domain/Entity';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';
import { UserRegisterDomainEvent } from './UserRegisterDomainEvent';

export class User extends Entity {
  readonly id: Uuid;
  readonly name: UserName;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly isActive: boolean;

  constructor(id: Uuid, name: UserName, email: UserEmail, password: UserPassword, isActive: boolean) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.isActive = isActive;
  }

  static create(id: Uuid, name: UserName, email: UserEmail, password: UserPassword): User {
    const isActive = false;
    const user = new User(id, name, email, password, isActive);

    user.addDomainEvent(new UserRegisterDomainEvent(user.id.value, user.email.value, user.name.value));

    return user;
  }
}
