import { Entity } from '../../Shared/domain/Entity';
import { Uuid } from '../../Shared/domain/value-object/Uuid';
import { EmailAddres } from './EmailAddres';
import { EmailId } from './EmailId';

export class Email extends Entity {
  readonly id: EmailId;
  readonly to: EmailAddres;
  readonly from: EmailAddres;
  readonly subject: string;
  readonly body: string;

  constructor(emailTo: EmailAddres, emailFrom: EmailAddres, subject: string, body: string, id?: EmailId) {
    super();
    this.id = id || new EmailId(Uuid.random().value);
    this.to = emailTo;
    this.from = emailTo;
    this.subject = subject;
    this.body = body;
  }
}
