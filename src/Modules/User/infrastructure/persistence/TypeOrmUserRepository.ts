import { EntityRepository, Repository, EntityManager } from 'typeorm';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { UserRepository } from '../../domain/UserRepository';
import { UserTotalNotesCreated } from '../../domain/UserTotalNotesCreated';
import { UserSchema } from './typeorm/UserSchema';

@EntityRepository()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private manager: EntityManager) {}

  save(user: User): Promise<void> {
    const userSchema = new UserSchema();
    userSchema.email = user.email.value;
    userSchema.id = user.id.value;
    userSchema.name = user.name.value;
    userSchema.password = user.password.value;
    userSchema.isActive = user.isActive;
    userSchema.totalNotesCreated = user.totalNotesCreated.toPrimitives();

    return this.persist(userSchema);
  }
  private async persist(user: UserSchema) {
    await this.manager.save(user);
  }

  async search(id: UserId): Promise<User | null> {
    const userSchema = await this.manager.findOne(UserSchema, { id: id.value });

    if (!userSchema) {
      return null;
    }
    const user = new User(
      new UserId(userSchema.id),
      new UserName(userSchema.name),
      new UserEmail(userSchema.email),
      new UserPassword(userSchema.password),
      userSchema.isActive,
      new UserTotalNotesCreated(userSchema.totalNotesCreated)
    );

    return user;
  }

  async delete(id: UserId): Promise<void> {
    await this.manager.delete(UserSchema, id.value);
  }

  async userEmailExist(email: UserEmail): Promise<boolean> {
    const user = await this.manager.findOne(UserSchema, { email: email.value });
    if (!user) {
      return false;
    }
    return true;
  }
}
