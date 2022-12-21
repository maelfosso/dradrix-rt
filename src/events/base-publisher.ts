import { Stan } from 'node-nats-streaming';
import { Event } from "./event";

export abstract class Publisher<T extends Event> {
  abstract subject: T['subject'];
  private client: Stan;
  // need the jetStream client

  constructor(client: Stan) {
    this.client = client;
    // check if the stream associated to the subject does exists
    // if not, add it first

    // get an instance of the jet stream
  }

  publish(data: T['data']): Promise<void> {
    // publish into a jet stream jetStream
    // jetStream.publish(subject, data)
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }

        console.log('Event published');
        resolve();
      })
    })
  }
}