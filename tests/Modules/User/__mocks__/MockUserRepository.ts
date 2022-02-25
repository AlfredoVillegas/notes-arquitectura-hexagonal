import { Uuid } from '../../../../src/Modules/Shared/domain/value-object/Uuid';
import { Params as userParamsType } from '../../../../src/Modules/User/application/UserRegister';
import { User } from '../../../../src/Modules/User/domain/User';
import { UserEmail } from '../../../../src/Modules/User/domain/UserEmail';
import { UserId } from '../../../../src/Modules/User/domain/UserId';
import { UserName } from '../../../../src/Modules/User/domain/UserName';
import { UserPassword } from '../../../../src/Modules/User/domain/UserPassword';
import { UserRepository } from '../../../../src/Modules/User/domain/UserRepository';
import { UserTotalNotesCreated } from '../../../../src/Modules/User/domain/UserTotalNotesCreated';

export class MockUserRepository implements UserRepository {
  private userDomain: User | null = null;

  public userDataPlainForTest: userParamsType = {
    id: Uuid.random().value,
    name: 'Example Name',
    email: 'example@example.com',
    password: '12345678'
  };

  static CreateUserDomainEntity(user: userParamsType): User {
    return new User(
      new UserId(user.id),
      new UserName(user.name),
      new UserEmail(user.email),
      new UserPassword(user.password),
      false,
      new UserTotalNotesCreated(0)
    );
  }

  save(user: User): Promise<void> {
    this.userDomain = user;
    return Promise.resolve();
  }
  search(id: UserId): Promise<User | null> {
    if (this.userDomain?.id.value === id.value) {
      return Promise.resolve(this.userDomain);
    }
    return Promise.resolve(null);
  }
  delete(id: UserId): Promise<void> {
    this.userDomain = null;
    return Promise.resolve();
  }
  userEmailExist(email: UserEmail): Promise<boolean> {
    if (this.userDomain?.email.value === email.value) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
