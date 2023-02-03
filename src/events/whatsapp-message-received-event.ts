import { Streams } from "./streams";
import { Subjects } from "./subjects";
import { WhatsAppMessageWoZSentDataType } from "./types";

export interface WhatsAppMessageReceivedEvent {
  subject: Subjects.WhatsAppMessageReceived,
  stream: Streams.WhatsAppMessage,
  data: {
    id: string;
    from: string;
    timestamp: string;
    type: string;
  }
}

export interface WhatsAppMessageWoZSentEvent {
  subject: Subjects.WhatsAppMessageWoZSent,
  stream: Streams.WhatsAppMessage,
  data: WhatsAppMessageWoZSentDataType
}
