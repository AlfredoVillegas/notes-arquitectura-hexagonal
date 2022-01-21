import { Email } from '../domain/Email';
import { EmailAddres } from '../domain/EmailAddres';
import { EmailSender } from '../domain/EmailSender';

export class SendWelcomeEmail {
  private emailSender: EmailSender;
  constructor(emailSender: EmailSender) {
    this.emailSender = emailSender;
  }

  async run(emailTo: string, emailFrom: string): Promise<void> {
    const params = {
      emailTo: new EmailAddres(emailTo),
      emailFrom: new EmailAddres(emailFrom),
      subject: 'Welcome',
      body: 'Welcome to whis word , next : ...'
    };
    const email = new Email(params.emailTo, params.emailFrom, params.subject, params.body);

    await this.emailSender.send(email);
  }
}
