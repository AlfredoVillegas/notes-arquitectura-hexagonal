import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserId } from '../../domain/UserId';
import { UserRepository } from '../../domain/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private Users: User[] = [];

  async save(user: User): Promise<void> {
    /*const exist =
    if (await this.search(user.id)) {
      
    }*/
    this.Users.push(user);
  }

  async search(id: UserId): Promise<User | null> {
    let userFind: User | null = null;

    for (let user of this.Users) {
      if (user.id.value === id.value) {
        userFind = user;
      }
    }
    return userFind;
  }

  async delete(id: UserId): Promise<void> {}

  async userEmailExist(email: UserEmail): Promise<boolean> {
    // Implementar metodo Fake
    return false;
  }
}
