import { Hashing } from './Hashing';

import { UserPassword } from './UserPassword';

export class HashUserPassword {
  private hashing: Hashing; // interface for hasher text plain

  constructor(hashing: Hashing) {
    this.hashing = hashing;
  }
  /**
   * hashear Password , se asegura de que es valido
   * y retorna un UserPassword Hasheado (Valor seguro para Persistir)
   */
  public async run(userPassword: UserPassword): Promise<UserPassword> {
    userPassword.validateLengthIsHigher8(userPassword.value);
    const passwordHashed = await this.hashing.hashPassword(userPassword.value);

    return new UserPassword(passwordHashed);
  }
}
