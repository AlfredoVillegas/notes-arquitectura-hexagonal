import { UserNotExist } from '../domain/Errors';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class UserFinderById {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<User> {
    const user = await this.repository.search(new UserId(id));

    if (!user) {
      throw new UserNotExist(id);
    }

    return user;
  }
}
