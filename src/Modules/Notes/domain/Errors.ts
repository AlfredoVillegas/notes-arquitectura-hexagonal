export class NoteNotExist extends Error {
  constructor(id: string) {
    super(`note whit id: ${id} not exists`);
  }
}
