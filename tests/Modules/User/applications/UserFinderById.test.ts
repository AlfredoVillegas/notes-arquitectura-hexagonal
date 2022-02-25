import { UserFinderById } from '../../../../src/Modules/User/application/UserFinderById';
import { MockUserRepository } from '../__mocks__/MockUserRepository';

let userRepositoryMock: MockUserRepository;
let userFinderById: UserFinderById;

beforeEach(() => {
  userRepositoryMock = new MockUserRepository();
  userRepositoryMock.save(MockUserRepository.CreateUserDomainEntity(userRepositoryMock.userDataPlainForTest));
  userFinderById = new UserFinderById(userRepositoryMock);
});

//afterEach(() => {});

describe('Test of UserFinderById', () => {
  it('should get an user from the id', async () => {
    const userInDB = await userFinderById.run(userRepositoryMock.userDataPlainForTest.id);
    expect(userInDB?.id.value).toBe(userRepositoryMock.userDataPlainForTest.id);
  });
});
