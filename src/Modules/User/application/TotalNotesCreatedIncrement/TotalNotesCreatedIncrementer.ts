import { UserId } from '../../domain/UserId';
import { UserRepository } from '../../domain/UserRepository';
import { UserFinderById } from '../UserFinderById';

export class TotalNotesCreatedIncrementer {
  private finder: UserFinderById;

  constructor(private repository: UserRepository) {
    this.finder = new UserFinderById(repository);
  }

  public async run(id: string) {
    const userId = new UserId(id);

    const user = await this.finder.run(userId);

    user.totalNotesCreated.incrementBy1();
    console.log('total notes created incrementer. llamado');
    await this.repository.save(user);
  }
}
