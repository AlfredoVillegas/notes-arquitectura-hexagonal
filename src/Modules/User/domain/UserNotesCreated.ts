export class UserNotesCreated {
  private value: number;
  constructor(notesCreated: number) {
    this.value = notesCreated;
  }
  public incrementBy1() {
    this.value++;
  }
}
