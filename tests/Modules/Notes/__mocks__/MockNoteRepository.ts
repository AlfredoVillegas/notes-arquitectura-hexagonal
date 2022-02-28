import { registerAuthRouters } from '../../../../src/apps/routes/auth.router';
import { Note } from '../../../../src/Modules/Notes/domain/Note';
import { NoteBody } from '../../../../src/Modules/Notes/domain/NoteBody';
import { NoteId } from '../../../../src/Modules/Notes/domain/NoteId';
import { NoteRepository } from '../../../../src/Modules/Notes/domain/NoteRepository';
import { NoteTitle } from '../../../../src/Modules/Notes/domain/NoteTitle';
import { Uuid } from '../../../../src/Modules/Shared/domain/value-object/Uuid';

export class MockNoteRepository implements NoteRepository {
  private notes: Note[] = [];
  public noteDataPlainForTest = {
    id: Uuid.random().value,
    body: 'Body test',
    title: 'title',
    creatorUserId: Uuid.random().value
  };

  static CreateNoteDomainEntity(note: { id: string; body: string; title: string; creatorUserId: string }): Note {
    return new Note(
      new NoteId(note.id),
      new Uuid(note.creatorUserId),
      new NoteBody(note.body),
      new NoteTitle(note.title)
    );
  }

  save(note: Note): Promise<void> {
    this.notes.push(note);
    return Promise.resolve();
  }

  searchById(noteId: NoteId): Promise<Note | null> {
    const note = this.notes.find(note => note.id.value === noteId.value);
    return !note ? Promise.resolve(null) : Promise.resolve(note);
  }

  delete(noteId: NoteId): Promise<void> {
    this.notes = this.notes.filter(note => note.id.value !== noteId.value);
    return Promise.resolve();
  }
}
