export class UserTotalNotesCreated {
  private value: number;
  constructor(notesCreated: number) {
    this.value = notesCreated;
  }
  public incrementBy1() {
    this.value++;
  }
  public toPrimitives() {
    return this.value;
  }
}
