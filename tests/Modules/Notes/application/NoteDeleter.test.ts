import { NoteDeleter } from '../../../../src/Modules/Notes/application/NoteDeleter';
import { NoteId } from '../../../../src/Modules/Notes/domain/NoteId';
import { MockNoteRepository } from '../__mocks__/MockNoteRepository';

let noteDeleter: NoteDeleter;
let noteRepository: MockNoteRepository;

beforeEach(() => {
  noteRepository = new MockNoteRepository();
  noteRepository.save(MockNoteRepository.CreateNoteDomainEntity(noteRepository.noteDataPlainForTest));
  noteDeleter = new NoteDeleter(noteRepository);
});

//afterEach(() => {});

describe('Test od noteDeleter', () => {
  it('should valid note', async () => {
    await noteDeleter.run(noteRepository.noteDataPlainForTest.id);
    const noteInDB = await noteRepository.searchById(new NoteId(noteRepository.noteDataPlainForTest.id));
    expect(noteInDB).toBe(null);
  });
});
