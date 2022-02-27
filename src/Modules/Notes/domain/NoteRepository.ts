import { Note } from './Note';
import { NoteId } from './NoteId';

export interface NoteRepository {
  save(note: Note): Promise<void>;
  searchById(noteId: NoteId): Promise<Note | null | undefined>;
  delete(noteId: NoteId): Promise<void>;
}
