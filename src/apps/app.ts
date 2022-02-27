import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { InMemorySyncEventBus } from '../Modules/Shared/infrastructure/EventBus/InMemorySyncEventBus';
import { registerSubscribers } from './eventsSuscribers';
import Server from './server';

(async () => {
  dotenv.config();

  console.log('Init: connection of TypeOrm for api');
  await createConnection();

  console.log('InitEventBuss');
  const eventBus = new InMemorySyncEventBus();
  console.log('register Events Subscribers');
  registerSubscribers(eventBus);

  console.log('Init Server');
  const server = new Server(eventBus);
  server.listen();
})();
