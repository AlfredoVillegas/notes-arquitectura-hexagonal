import { Email } from '../domain/Email';
import { EmailAddres } from '../domain/EmailAddres';
import { EmailSender } from '../domain/EmailSender';

export class SendWelcomeEmail {
  private emailSender: EmailSender;
  constructor(emailSender: EmailSender) {
    this.emailSender = emailSender;
  }

  async run(emailTo: string, emailFrom: string, userName: string): Promise<void> {
    const params = {
      emailTo: new EmailAddres(emailTo),
      emailFrom: new EmailAddres(emailFrom),
      subject: 'Welcome',
      body: `hello ${userName}, Welcome to this word , next : ...`
    };
    const email = new Email(params.emailTo, params.emailFrom, params.subject, params.body);

    await this.emailSender.send(email);
  }
}
