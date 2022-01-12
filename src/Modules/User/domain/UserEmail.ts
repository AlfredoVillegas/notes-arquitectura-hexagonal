export class UserEmail {
  readonly value: string;

  constructor(email: string) {
    this.validate(email);
    this.value = email;
  }

  private validate(email: string) {
    const regex = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!regex.test(email)) {
      console.log('no coincide con patron regular : lanzar exepcion: ' + email);
      throw new Error('no coincide con patron regular : lanzar exepcion:');
    }
  }
}
