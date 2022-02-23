import { EntityRepository, EntityManager } from 'typeorm';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserPassword } from '../../domain/UserPassword';
import { UserRepository } from '../../domain/UserRepository';
import { UserTotalNotesCreated } from '../../domain/UserTotalNotesCreated';
import { UserSchema as userSchemaOrm, UserSchemaType } from './typeorm/UserSchema';

@EntityRepository()
export class TypeOrmUserRepository implements UserRepository {
  constructor(private manager: EntityManager) {}

  async save(user: User): Promise<void> {
    const userSchema: UserSchemaType = user.toPrimitives();

    await this.manager.save(userSchemaOrm, userSchema);
  }

  private async persist(user: UserSchemaType) {
    await this.manager.save(userSchemaOrm, user);
  }

  async search(id: UserId): Promise<User | null> {
    const userSchema = await this.manager.findOne(userSchemaOrm, { id: id.value });

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
    await this.manager.delete(userSchemaOrm, id.value);
  }

  async userEmailExist(email: UserEmail): Promise<boolean> {
    const user = await this.manager.findOne(userSchemaOrm, { email: email.value });
    if (!user) {
      return false;
    }
    return true;
  }
}
