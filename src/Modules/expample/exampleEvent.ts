import { ReceiverEvent } from '../Shared/domain/ReceiverEvent';
import { createExample } from './create';

export class exampleEvent implements ReceiverEvent {
  constructor() {
    console.log('exampler Receiver preparado');
  }

  receive(topic: string, subject: String): void {
    console.log(`promiximo a lanzar logica Secundario:::: Subjet: ${subject}`);
    new createExample(topic);
  }
}
