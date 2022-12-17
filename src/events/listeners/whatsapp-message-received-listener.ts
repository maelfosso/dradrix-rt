import { Message } from "node-nats-streaming";
import { Listener } from "../base-listener";
import { Subjects } from "../subjects";
import { WhatsAppMessageReceivedEvent } from "../whatsapp-message-received-event";

export class WhatsAppMessageReceivedListener extends Listener<WhatsAppMessageReceivedEvent> {
  subject: Subjects.WhatsAppMessageReceived = Subjects.WhatsAppMessageReceived;
  queueGroupName: string = 'whatsapp-message-service';

  onMessage(data: WhatsAppMessageReceivedEvent['data'], msg: Message) {
    console.log('Event data !', data);

    msg.ack();
  }
}