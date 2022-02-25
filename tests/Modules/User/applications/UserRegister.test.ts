import { InvalidArgumentError } from '../../../../src/Modules/Shared/domain/value-object/InvalidArgumentError';
import { UserRegister } from '../../../../src/Modules/User/application/UserRegister';
import { UserEmailAlreadyExists } from '../../../../src/Modules/User/domain/Errors';
import { User } from '../../../../src/Modules/User/domain/User';
import { UserId } from '../../../../src/Modules/User/domain/UserId';
import { MockEventBus } from '../__mocks__/MockEventBus';
import { MockHasher } from '../__mocks__/MockHasher';
import { MockUserRepository } from '../__mocks__/MockUserRepository';

let userRepository: MockUserRepository;
let userRegister: UserRegister;
let eventBus: MockEventBus;
let hasher: MockHasher;

beforeEach(() => {
  eventBus = new MockEventBus();
  hasher = new MockHasher();
  userRepository = new MockUserRepository(); // //new InMemoryUserRepository();
  userRegister = new UserRegister(hasher, userRepository, eventBus);
});

//afterEach(() => {});

describe('Test of UserRegister', () => {
  it('should create a valid user', async () => {
    await userRegister.run(userRepository.userDataPlainForTest);

    const userExist = await userRepository.search(new UserId(userRepository.userDataPlainForTest.id));

    if (!userExist) {
      throw new Error('error in test');
    }

    expect(userExist).toBeInstanceOf(User);
    expect(userExist.id.value).toEqual(userRepository.userDataPlainForTest.id);
    expect(eventBus.getCallsToPublishEvent()).toEqual(1);
  });

  it('should hash user password (call encripter) when create a user', async () => {
    await userRegister.run(userRepository.userDataPlainForTest);

    const userExist = await userRepository.search(new UserId(userRepository.userDataPlainForTest.id));

    if (!userExist) {
      throw new Error('error in test');
    }

    expect(hasher.getCallsToHashPassword()).toEqual(1);
  });

  it('should throw an error when the user email already exists', async () => {
    await userRegister.run(userRepository.userDataPlainForTest);
    expect.assertions(1);

    try {
      await userRegister.run(userRepository.userDataPlainForTest);
    } catch (e) {
      expect(e).toBeInstanceOf(UserEmailAlreadyExists);
    }
  });

  it('should throw an Argument error for invalid User Email', async () => {
    expect.assertions(1);
    userRepository.userDataPlainForTest.email = 'exampleFail.com';
    try {
      await userRegister.run(userRepository.userDataPlainForTest);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });

  it('should throw an Argument error for invalid User Password ', async () => {
    expect.assertions(1);
    userRepository.userDataPlainForTest.password = '1234';
    try {
      await userRegister.run(userRepository.userDataPlainForTest);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});
