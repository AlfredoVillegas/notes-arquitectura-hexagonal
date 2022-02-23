export class UserTotalNotesCreated {
  private value: number;
  constructor(notesCreated: number) {
    this.value = notesCreated;
  }
  public incrementBy1(): void {
    this.value++;
  }
  public toPrimitives(): number {
    return this.value;
  }
}
