import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';

export class NoteTitle {
  readonly value: string;

  constructor(noteTitle: string) {
    this.ensureLengthIsLessThan20Characters(noteTitle);
    this.value = noteTitle;
  }

  private ensureLengthIsLessThan20Characters(noteTitle: string) {
    if (noteTitle.length > 20) {
      throw new InvalidArgumentError('El titulo debe tener menos de 20 caracteres');
    }
  }
}
