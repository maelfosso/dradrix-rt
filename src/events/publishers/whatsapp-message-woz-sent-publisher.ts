import { Publisher } from "../base-publisher";
import { Streams } from "../streams";
import { Subjects } from "../subjects";
import { WhatsAppMessageWoZSentEvent } from "../whatsapp-message-received-event";

export class WhatsAppMessageWoZSentPublisher extends Publisher<WhatsAppMessageWoZSentEvent> {
  subject: Subjects.WhatsAppMessageWoZSent = Subjects.WhatsAppMessageWoZSent;
  stream: Streams.WhatsAppMessage = Streams.WhatsAppMessage;
}
