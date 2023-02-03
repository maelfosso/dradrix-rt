import { Publisher } from "../base-publisher";
import { Streams } from "../streams";
import { Subjects } from "../subjects";
import { WhatsAppMessageReceivedEvent } from "../whatsapp-message-received-event";

export class WhatsAppMessageReceivedPublisher extends Publisher<WhatsAppMessageReceivedEvent> {
  subject: Subjects.WhatsAppMessageReceived = Subjects.WhatsAppMessageReceived;
  stream: Streams.WhatsAppMessage = Streams.WhatsAppMessage;
}
