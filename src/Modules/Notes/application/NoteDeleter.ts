import { NoteRepository } from '../domain/NoteRepository';
import { NoteFinderById } from './NoteFinderById';

export class NoteDeleter {
  private repository: NoteRepository;
  private finder: NoteFinderById;
  constructor(repository: NoteRepository) {
    this.repository = repository;
    this.finder = new NoteFinderById(repository);
  }

  public async run(id: string): Promise<void> {
    const note = await this.finder.run(id);

    await this.repository.delete(note.id);
  }
}
