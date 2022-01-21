import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';
import { UserFinderById } from './UserFinderById';

export class UserNotesCreatedIncrement {
  constructor(private repository: UserRepository) {}

  public async run(id: string) {
    const userId = new UserId(id);

    const user = await this.repository.search(userId);

    if (!user) {
      throw new Error(`this user id: ${userId.value} not exists`);
    }

    user.notesCreated.incrementBy1();

    await this.repository.save(user);
  }
}
