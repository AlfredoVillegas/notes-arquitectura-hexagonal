import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class UserFinderById {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: UserId): Promise<User> {
    const user = await this.repository.search(id);

    if (!user) {
      throw new Error(`this user whit id: ${id.value} not exists`);
    }

    return user;
  }
}
