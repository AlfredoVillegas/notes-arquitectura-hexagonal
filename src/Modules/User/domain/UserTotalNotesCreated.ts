export class UserTotalNotesCreated {
  readonly value: number;
  constructor(notesCreated: number) {
    this.value = notesCreated;
  }
  public incrementBy1(): UserTotalNotesCreated {
    return new UserTotalNotesCreated(this.value + 1);
  }
  public toPrimitives(): number {
    return this.value;
  }
}
