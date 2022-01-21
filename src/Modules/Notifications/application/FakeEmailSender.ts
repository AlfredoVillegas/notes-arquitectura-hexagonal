import { Email } from '../domain/Email';
import { EmailSender } from '../domain/EmailSender';

export class FakeEmailSender implements EmailSender {
  constructor() {}
  async send(email: Email): Promise<void> {
    console.log('Enviando Email from FakeEmail');
    console.log(`email : ${email.body}`);
  }
}
