import { Subjects } from "./subjects";

export interface WhatsAppMessageReceivedEvent {
  subject: Subjects.WhatsAppMessageReceived,
  stream: "whatsapp:message"
  data: {
    id: string;
    from: string;
    timestamp: string;
    type: string;
  }
}