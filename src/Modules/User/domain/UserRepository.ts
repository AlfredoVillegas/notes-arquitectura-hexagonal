import { User } from './User';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';

export interface UserRepository {
  save(user: User): Promise<void>;

  search(id: UserId): Promise<User | null>;

  delete(id: UserId): Promise<void>;

  userEmailExist(email: UserEmail): Promise<boolean>;
}
