import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class UserFinderById {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: UserId): Promise<User | null> {
    const user = await this.repository.search(id);

    if (user) {
      console.log(`User conseguido: ${user.email.value} , is active : ${user.isActive}`);
    }

    return user;
  }
}
