import { UserRepository } from '../domain/UserRepository';
import { UserFinderById } from './UserFinderById';

export class UserDeleter {
  private repository: UserRepository;
  private finder: UserFinderById;
  constructor(repository: UserRepository) {
    this.repository = repository;
    this.finder = new UserFinderById(repository);
  }

  public async run(id: string): Promise<void> {
    const user = await this.finder.run(id);

    await this.repository.delete(user.id);
  }
}
