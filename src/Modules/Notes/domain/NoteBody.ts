import { InvalidArgumentError } from '../../Shared/domain/value-object/InvalidArgumentError';

export class NoteBody {
  readonly value: string;
  constructor(noteBody: string) {
    this.ensureLengthIsHigherThan1Characters(noteBody);
    this.value = noteBody;
  }
  private ensureLengthIsHigherThan1Characters(noteBody: string) {
    if (noteBody.length < 1) {
      throw new InvalidArgumentError('No se Premiten Notas Vacias');
    }
  }
}
