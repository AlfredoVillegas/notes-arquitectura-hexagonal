import { InvalidArgumentError } from '../../../../src/Modules/Shared/domain/value-object/InvalidArgumentError';
import { Uuid } from '../../../../src/Modules/Shared/domain/value-object/Uuid';
import { InMemorySyncEventBus } from '../../../../src/Modules/Shared/infrastructure/EventBus/InMemorySyncEventBus';
import { Params, UserRegister } from '../../../../src/Modules/User/application/UserRegister';
import { UserEmailAlreadyExists } from '../../../../src/Modules/User/domain/Errors';
import { User } from '../../../../src/Modules/User/domain/User';
import { UserId } from '../../../../src/Modules/User/domain/UserId';
import { UserRepository } from '../../../../src/Modules/User/domain/UserRepository';
import { BcryptHasher } from '../../../../src/Modules/User/infrastructure/BcryptHashing';
import { InMemoryUserRepository } from '../../../../src/Modules/User/infrastructure/persistence/InMemoryUserRepository';

let userRepository: UserRepository;
let userRegister: UserRegister;

const eventBus = new InMemorySyncEventBus();
const hasher = new BcryptHasher();

const user: Params = {
  id: Uuid.random().value,
  name: 'Alf Ville',
  email: 'alfreddo444@hotmail.com',
  password: '12345678'
};

beforeEach(() => {
  userRepository = new InMemoryUserRepository();
  userRegister = new UserRegister(hasher, userRepository, eventBus);
});

afterEach(() => {
  user.email = 'alfreddo222@hotmail.com';
  user.password = '12345678';
});

describe('Test of UserRegister', () => {
  /*beforeEach(() => {

  });*/

  test('should create a valid user ', async () => {
    await userRegister.run(user);
    const userExist = await userRepository.search(new UserId(user.id));

    if (userExist) {
      expect(userExist).toBeInstanceOf(User);
      expect(userExist.id.value).toEqual(user.id);
    }
  });

  test('should throw an error when the user email already exists', async () => {
    await userRegister.run(user);
    expect.assertions(1);

    try {
      await userRegister.run(user);
    } catch (e) {
      expect(e).toBeInstanceOf(UserEmailAlreadyExists);
    }
  });

  test('should throw an Argument error for invalid User Email', async () => {
    expect.assertions(1);
    user.email = 'alfreddo22l.com';
    try {
      await userRegister.run(user);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });

  test('should throw an Argument error for invalid User Password ', async () => {
    expect.assertions(1);
    user.password = '1234';
    try {
      await userRegister.run(user);
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });
});
