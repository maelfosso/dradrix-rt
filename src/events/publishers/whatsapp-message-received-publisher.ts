import { Publisher } from "../base-publisher";
import { Subjects } from "../subjects";
import { WhatsAppMessageReceivedEvent } from "../whatsapp-message-received-event";

export class WhatsAppMessageReceivedPublisher extends Publisher<WhatsAppMessageReceivedEvent> {
  subject: Subjects.WhatsAppMessageReceived = Subjects.WhatsAppMessageReceived;
}
