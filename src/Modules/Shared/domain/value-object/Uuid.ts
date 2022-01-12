import { v4 } from 'uuid';
import validate from 'uuid-validate';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      //throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
      throw new Error('id no es un Uuid Valido');
    }
  }

  toString(): string {
    return this.value;
  }
}
