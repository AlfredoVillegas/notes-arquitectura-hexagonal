import { UserRegister, Params } from '../Modules/User/application/UserRegister';
import { UserFinderById } from '../Modules/User/application/UserFinderById';
import { Hashing } from '../Modules/User/domain/Hashing';

import { UserId } from '../Modules/User/domain/UserId';
import { UserRepository } from '../Modules/User/domain/UserRepository';
import { BcryptHasher } from '../Modules/User/infrastructure/BcryptHashing';

import { InMemoryUserRepository } from '../Modules/User/infrastructure/persistence/InMemoryUserRepository';
import { EventBus } from '../Modules/Shared/domain/EventBus';
import { ConcretEventBus } from '../Modules/Shared/infrastructure/EventBus/ConcretEventBus';
import { exampleEvent } from '../Modules/Notifications/exampleEvent';
import { SendWelcomeEmailOnUserRegistered } from '../Modules/Notifications/application/SendWelcomeEmailOnUserRegistered';
import { SendWelcomeEmail } from '../Modules/Notifications/application/SendWelcomeEmail';
import { FakeEmailSender } from '../Modules/Notifications/application/FakeEmailSender';

class start {
  private repositoryInMemory: UserRepository = new InMemoryUserRepository();
  private hasherBcrypt: Hashing = new BcryptHasher();
  private eventBusFake: EventBus = new ConcretEventBus();
  constructor() {
    this.run();
  }
  async run() {
    // Preparando EventBus en Memoria

    this.eventBusFake.addSubscribe(new exampleEvent());
    this.eventBusFake.addSubscribe(new SendWelcomeEmailOnUserRegistered(new SendWelcomeEmail(new FakeEmailSender())));

    let register = new UserRegister(this.hasherBcrypt, this.repositoryInMemory, this.eventBusFake);
    const idid = UserId.random();
    const id = new UserId(idid.value);
    const user: Params = {
      id: idid.value,
      name: 'Alf Ville',
      email: 'alfreddo444@hotmail.com',
      password: '12345678'
    };

    console.log('creaaaarrr En repository');
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
