import { JsMsg } from "nats";
import { Message } from "node-nats-streaming";
import { Listener } from "../base-listener";
import { Streams } from "../streams";
import { Subjects } from "../subjects";
import { WhatsAppMessageReceivedEvent } from "../whatsapp-message-received-event";

export class WhatsAppMessageReceivedListener extends Listener<WhatsAppMessageReceivedEvent> {
  subject: Subjects.WhatsAppMessageReceived = Subjects.WhatsAppMessageReceived;
  stream: Streams.WhatsAppMessage = Streams.WhatsAppMessage;

  onMessage(data: WhatsAppMessageReceivedEvent['data'], msg: JsMsg) {
    console.log('Event data !', data);

    msg.ack();
  }
}
