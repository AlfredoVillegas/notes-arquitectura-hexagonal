import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';

export class UserDeleter {
  readonly repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async run(id: string): Promise<void> {
    const user = await this.repository.search(new UserId(id));

    if (!user) {
      throw new Error('no hay usuarion con ese id ');
    }

    await this.repository.delete(new UserId(id));

    return console.log(`Event User Delete: ${id}`);
  }
}
