import { NoteUpdater } from '../../../../src/Modules/Notes/application/NoteUpdater';
import { Note } from '../../../../src/Modules/Notes/domain/Note';
import { NoteId } from '../../../../src/Modules/Notes/domain/NoteId';
import { MockNoteRepository } from '../__mocks__/MockNoteRepository';

let noteRepository: MockNoteRepository;
let noteUpdater: NoteUpdater;

beforeEach(() => {
  noteRepository = new MockNoteRepository(); //
  noteUpdater = new NoteUpdater(noteRepository);
  noteRepository.save(MockNoteRepository.CreateNoteDomainEntity(noteRepository.noteDataPlainForTest));
});

//afterEach(() => {});

describe('Test of NoteUpdater', () => {
  it('should update a valid Note', async () => {
    const noteDataTest = noteRepository.noteDataPlainForTest;
    await noteUpdater.run(noteDataTest.id, noteDataTest.body, noteDataTest.title);

    let noteInDb = await noteRepository.searchById(new NoteId(noteDataTest.id));

    if (!noteInDb) {
      throw new Error('error in test');
    }

    expect(noteInDb).toBeInstanceOf(Note);
    expect(noteInDb.id.value).toEqual(noteDataTest.id);
    expect(noteInDb.toPrimitives().body).toEqual(noteDataTest.body);
    expect(noteInDb.toPrimitives().title).toEqual(noteDataTest.title);
  });
});
