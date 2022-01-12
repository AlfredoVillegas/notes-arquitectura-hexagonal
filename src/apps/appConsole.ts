import { UserRegister, Params } from '../Modules/User/application/UserRegister';
import { UserFinderById } from '../Modules/User/application/UserFinderById';
import { Hashing } from '../Modules/User/domain/Hashing';
import { User } from '../Modules/User/domain/User';
import { UserId } from '../Modules/User/domain/UserId';
import { UserRepository } from '../Modules/User/domain/UserRepository';
import { BcryptHasher } from '../Modules/User/infrastructure/BcryptHashing';
//import { HasherInMemory } from '../Modules/User/infrastructure/HasherInMemory';
import { InMemoryUserRepository } from '../Modules/User/infrastructure/persistence/InMemoryUserRepository';

class start {
  private repositoryInMemory: UserRepository = new InMemoryUserRepository();
  private hasherBcrypt: Hashing = new BcryptHasher();
  constructor() {
    this.run();
  }
  async run() {
    let register = new UserRegister(this.hasherBcrypt, this.repositoryInMemory);
    const idid = UserId.random();
    const id = new UserId(idid.value);
    const user: Params = {
      id: idid.value,
      name: 'Alf Ville',
      email: 'alfreddo444@hotmail.com',
      password: '12345678'
    };

    console.log('creaaaarrr repository');
    try {
      await register.run(user);
    } catch (error) {
      return console.log('Capturando exepcion: ' + error);
    }

    let finder = new UserFinderById(this.repositoryInMemory);
    console.log('buscarrrrrrrr repository');
    let result = await finder.run(id);
    console.log(result);
    console.log('finalllll');
  }
}

new start();
