import { NoteNotExist } from '../domain/Errors';
import { Note } from '../domain/Note';
import { NoteId } from '../domain/NoteId';
import { NoteRepository } from '../domain/NoteRepository';

export class NoteFinderById {
  private repository: NoteRepository;

  constructor(repository: NoteRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<Note> {
    const note = await this.repository.searchById(new NoteId(id));
    if (!note) {
      throw new NoteNotExist(id);
    }
    return note;
  }
}
