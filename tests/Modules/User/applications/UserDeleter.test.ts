import { UserDeleter } from '../../../../src/Modules/User/application/UserDeleter';
import { UserId } from '../../../../src/Modules/User/domain/UserId';
import { MockUserRepository } from '../__mocks__/MockUserRepository';

let userDeleter: UserDeleter;
let userRepository: MockUserRepository;

beforeEach(() => {
  userRepository = new MockUserRepository();
  userRepository.save(MockUserRepository.CreateUserDomainEntity(userRepository.userDataPlainForTest));
  userDeleter = new UserDeleter(userRepository);
});

//afterEach(() => {});

describe('Test od UserDeleter', () => {
  it('should deleter user', async () => {
    await userDeleter.run(userRepository.userDataPlainForTest.id);
    const userInDB = await userRepository.search(new UserId(userRepository.userDataPlainForTest.id));
    expect(userInDB).toBe(null);
  });
});
