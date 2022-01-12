export class UserPassword {
  readonly value: string;

  constructor(password: string) {
    //this.validateLengthIsHigher8(password);
    this.value = password;
  }

  /*static validateForCreate(value: string, valueHashed: string): UserPassword {
    if (value.length < 8) {
      console.log('password debe contener almenos 8 caracteres');
      throw new Error('Caracteres Invalidos');
    }
    return new UserPassword(valueHashed);
  }*/

  public validateLengthIsHigher8(value: string) {
    if (value.length < 8) {
      console.log('password debe contener almenos 8 caracteres');
      throw new Error('Caracteres Invalidos');
    }
  }
}
