import { Note } from '../domain/Note';
import { NoteBody } from '../domain/NoteBody';
import { NoteId } from '../domain/NoteId';
import { NoteRepository } from '../domain/NoteRepository';

export class FakeNoteRepository implements NoteRepository {
  private notes: Note[] = [];

  async save(note: Note): Promise<void> {
    console.log(`guardado: note : ${note.id}`);
    this.notes.push(note);
  }

  searchById(noteId: NoteId): Promise<Note | null | undefined> {
    return Promise.resolve(null);
  }
  delete(noteId: NoteId): Promise<void> {
    return Promise.resolve();
  }
}
