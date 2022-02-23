import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';

export class UserPassword {
  readonly value: string;

  constructor(password: string) {
    this.value = password;
  }

  /*static validateForCreate(value: string, valueHashed: string): UserPassword {
    if (value.length < 8) {
      throw new Error('password debe contener almenos 8 caracteres');
    }
    return new UserPassword(valueHashed)
  }*/

  public validateLengthIsHigher8(value: string) {
    if (value.length < 6) {
      throw new InvalidArgumentError('password debe contener almenos 6 caracteres');
    }
  }
}
