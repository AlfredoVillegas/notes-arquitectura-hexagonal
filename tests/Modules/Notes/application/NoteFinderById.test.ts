import { NoteFinderById } from '../../../../src/Modules/Notes/application/NoteFinderById';
import { MockNoteRepository } from '../__mocks__/MockNoteRepository';

let noteRepositoryMock: MockNoteRepository;
let noteFinderById: NoteFinderById;

beforeEach(() => {
  noteRepositoryMock = new MockNoteRepository();
  noteRepositoryMock.save(MockNoteRepository.CreateNoteDomainEntity(noteRepositoryMock.noteDataPlainForTest));
  noteFinderById = new NoteFinderById(noteRepositoryMock);
});

//afterEach(() => {});

describe('Test of NoteFinderById', () => {
  it('should get an note from the id', async () => {
    const noteInDB = await noteFinderById.run(noteRepositoryMock.noteDataPlainForTest.id);
    expect(noteInDB.id.value).toBe(noteRepositoryMock.noteDataPlainForTest.id);
  });
});
