import { Note } from '../domain/Note';
import { NoteRepository } from '../domain/NoteRepository';

export class FakeNoteRepository implements NoteRepository {
  private notes: Note[] = [];

  async save(note: Note): Promise<void> {
    console.log(`guardado: note : ${note}`);
    this.notes.push(note);
  }
}
