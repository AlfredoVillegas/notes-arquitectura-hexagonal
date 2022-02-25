import { TotalNotesCreatedIncrementer } from '../../../../../src/Modules/User/application/TotalNotesCreatedIncrement/TotalNotesCreatedIncrementer';
import { UserId } from '../../../../../src/Modules/User/domain/UserId';
import { MockUserRepository } from '../../__mocks__/MockUserRepository';

let userRepositoryMock: MockUserRepository;
let totalNotesIncrementer: TotalNotesCreatedIncrementer;

beforeEach(() => {
  userRepositoryMock = new MockUserRepository();
  userRepositoryMock.save(MockUserRepository.CreateUserDomainEntity(userRepositoryMock.userDataPlainForTest));
  totalNotesIncrementer = new TotalNotesCreatedIncrementer(userRepositoryMock);
});

//afterEach(() => {});

describe('Test of TotalNotesCreatedIncremeter', () => {
  it('should increment the Total Notes Created for an user in 1', async () => {
    await totalNotesIncrementer.run(userRepositoryMock.userDataPlainForTest.id);

    const idFromUserDataTest = new UserId(userRepositoryMock.userDataPlainForTest.id);
    const userInDB = await userRepositoryMock.search(idFromUserDataTest);

    expect(userInDB?.totalNotesCreated.toPrimitives()).toBe(1);
  });
});
