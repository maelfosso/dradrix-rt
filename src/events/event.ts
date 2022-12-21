import { Subjects } from "./subjects";

export interface Event {
  // associated stream
  subject: Subjects;
  stream: string;
  data: any;
}
