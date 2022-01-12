import { Hashing } from '../domain/Hashing';
import { HashUserPassword } from '../domain/HashUserPassword';
import { User } from '../domain/User';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserPassword } from '../domain/UserPassword';
import { UserRepository } from '../domain/UserRepository';

export type Params = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class UserRegister {
  //private hasher: Hasher;
  private repository: UserRepository;
  private hashUserPasswordService: HashUserPassword;

  constructor(hashing: Hashing, repository: UserRepository) {
    //this.hasher = hasher;
    this.repository = repository;
    this.hashUserPasswordService = new HashUserPassword(hashing);
  }

  async run({ id, name, email, password }: Params): Promise<void> {
    /*const passwordHashed = this.hasher.hashPassword(password);

    const userPassword = UserPassword.validateForCreate(password, passwordHashed); */

    //const hashUserPasswordService = new HashUserPassword(this.hasher);

    const userPassword = await this.hashUserPasswordService.run(new UserPassword(password));

    const user = User.create(new UserId(id), new UserName(name), new UserEmail(email), userPassword);

    await this.repository.save(user);
    console.log('enviar email de confirmacion');
    console.log(`User Creado publicar evento user persistido: ${user.email.value}`);
  }
}