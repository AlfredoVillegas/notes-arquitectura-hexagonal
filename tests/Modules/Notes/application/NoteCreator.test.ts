import { NoteCreator } from '../../../../src/Modules/Notes/application/NoteCreator';
import { Note } from '../../../../src/Modules/Notes/domain/Note';
import { NoteId } from '../../../../src/Modules/Notes/domain/NoteId';
import { InvalidArgumentError } from '../../../../src/Modules/Shared/domain/value-object/InvalidArgumentError';
import { MockEventBus } from '../../User/__mocks__/MockEventBus';
import { MockNoteRepository } from '../__mocks__/MockNoteRepository';

let noteRepository: MockNoteRepository;
let noteCreator: NoteCreator;
let eventBus: MockEventBus;

beforeEach(() => {
  eventBus = new MockEventBus();

  noteRepository = new MockNoteRepository(); // //new InMemoryUserRepository();
  noteCreator = new NoteCreator(noteRepository, eventBus);
});

//afterEach(() => {});

describe('Test of NoteCreator', () => {
  it('should create a valid Note', async () => {
    const noteDataTest = noteRepository.noteDataPlainForTest;
    await noteCreator.run({ ...noteDataTest });

    const noteInDb = await noteRepository.searchById(new NoteId(noteDataTest.id));

    if (!noteInDb) {
      throw new Error('error in test');
    }

    expect(noteInDb).toBeInstanceOf(Note);
    expect(noteInDb.id.value).toEqual(noteDataTest.id);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });

  it('should throw an Argument error when noteTitle length is > 20', async () => {
    expect.assertions(1);
    noteRepository.noteDataPlainForTest.title = '123456789123456789123456789';
    try {
      await noteCreator.run(noteRepository.noteDataPlainForTest);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });

  it('should throw an Argument error when noteBody length is < 1', async () => {
    expect.assertions(1);
    noteRepository.noteDataPlainForTest.body = '';

    try {
      await noteCreator.run(noteRepository.noteDataPlainForTest);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});
