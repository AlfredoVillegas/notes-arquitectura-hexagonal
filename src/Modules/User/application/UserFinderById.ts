import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { UserNotExist } from '../domain/Errors';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class UserFinderById {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: Uuid): Promise<User> {
    const user = await this.repository.search(id);

    if (!user) {
      throw new UserNotExist(id.value);
    }

    return user;
  }
}
