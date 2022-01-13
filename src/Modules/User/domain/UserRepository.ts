import { User } from './User';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';

export interface UserRepository {
  save(user: User): Promise<void>;

  search(id: UserId): Promise<User | null>;

  userEmailExist(email: UserEmail): Promise<boolean>;
}
