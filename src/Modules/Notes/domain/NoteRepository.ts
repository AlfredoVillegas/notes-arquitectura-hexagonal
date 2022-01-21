import { Note } from './Note';

export interface NoteRepository {
  save(note: Note): Promise<void>;
}
