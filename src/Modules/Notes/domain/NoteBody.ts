export class NoteBody {
  readonly value: string;
  constructor(noteBody: string) {
    this.ensureLengthIsHigherThan1Characters(noteBody);
    this.value = noteBody;
  }
  private ensureLengthIsHigherThan1Characters(noteBody: string) {
    if (noteBody.length < 1) {
      throw new Error('No se Premiten Notas Vacias');
    }
  }
}
