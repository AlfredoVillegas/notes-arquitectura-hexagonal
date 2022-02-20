import { getCustomRepository } from 'typeorm';
import { SendWelcomeEmail } from '../Modules/Notifications/application/SendWelcomeEmail';
import { SendWelcomeEmailOnUserRegistered } from '../Modules/Notifications/application/SendWelcomeEmailOnUserRegistered';
import { FakeEmailSender } from '../Modules/Notifications/infrastructure/FakeEmailSender';
import { EventBus } from '../Modules/Shared/domain/EventBus';
import { IncrementTotalNotesCreatedOnNoteCreated } from '../Modules/User/application/TotalNotesCreatedIncrement/IncrementTotalNotesCreatedOnNoteCreated';
import { TotalNotesCreatedIncrementer } from '../Modules/User/application/TotalNotesCreatedIncrement/TotalNotesCreatedIncrementer';
import { TypeOrmUserRepository } from '../Modules/User/infrastructure/persistence/TypeOrmUserRepository';

export function registerSubscribers(eventBus: EventBus) {
  //const eventBus = new InMemorySyncEventBus();

  // Subscriptores en user
  const userRepository = getCustomRepository(TypeOrmUserRepository);
  const noteUserCreatedSuscriber = new IncrementTotalNotesCreatedOnNoteCreated(
    new TotalNotesCreatedIncrementer(userRepository)
  );
  eventBus.addSubscribe(noteUserCreatedSuscriber);

  // subscribers en notifications
  const sendWelcomneEmail = new SendWelcomeEmail(new FakeEmailSender());
  const sendWelcomeEmailSubscriber = new SendWelcomeEmailOnUserRegistered(sendWelcomneEmail);
  eventBus.addSubscribe(sendWelcomeEmailSubscriber);

  // subscribers en notes
}
