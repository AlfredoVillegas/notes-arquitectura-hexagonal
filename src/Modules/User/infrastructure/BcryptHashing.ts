import * as bcrypt from 'bcrypt';
import { Hashing } from '../domain/Hashing';

export class BcryptHasher implements Hashing {
  private saltOrRounds = 10;

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }
}
