import { NoteBody } from '../domain/NoteBody';
import { NoteRepository } from '../domain/NoteRepository';
import { NoteTitle } from '../domain/NoteTitle';
import { NoteFinderById } from './NoteFinderById';

export class NoteUpdater {
  private repository: NoteRepository;
  private noteFinder: NoteFinderById;

  constructor(repository: NoteRepository) {
    this.repository = repository;
    this.noteFinder = new NoteFinderById(this.repository);
  }

  async run(id: string, body: string, title: string): Promise<void> {
    const note = await this.noteFinder.run(id);
    note.update(new NoteBody(body), new NoteTitle(title));
    await this.repository.save(note);
  }
}
