import { Subjects } from "./subjects";

export interface WhatsAppMessageReceivedEvent {
  subject: Subjects.WhatsAppMessageReceived,
  data: {
    id: string;
    from: string;
    timestamp: string;
    type: string;
  }
}