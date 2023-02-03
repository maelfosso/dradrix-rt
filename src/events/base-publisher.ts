import { JetStreamClient, JetStreamManager } from "nats";
import { natsWrapper } from "../nats-wrapper";
import { BaseNats } from "./base-nats";
import { Event } from "./event";

export abstract class Publisher<T extends Event> extends BaseNats {
  abstract subject: T['subject'];
  abstract stream: T['stream'];
  // need the jetStream client
  // private jsm: JetStreamManager
  private js: JetStreamClient

  constructor(jsm: JetStreamManager, js: JetStreamClient) {
    super(jsm);
    // this.jsm = jsm;
    this.js = js;

    // check if the stream associated to the subject does exists
    // if not, add it first
    this.setup();

    // get an instance of the jet stream
  }

  private async setup() {
    let streamInfo = await this.checkStreamOrCreate(this.stream);
    streamInfo = await this.addSubjectToStream(streamInfo, this.subject);
  }

  // publish(data: T['data']): Promise<void> {
  //   // publish into a jet stream jetStream
  //   // jetStream.publish(subject, data)
  //   return new Promise((resolve, reject) => {
  //     this.client.publish(this.subject, JSON.stringify(data), (err) => {
  //       if (err) {
  //         return reject(err);
  //       }

  //       console.log('Event published');
  //       resolve();
  //     })
  //   })
  // }
  async publish(data: T['data']) {
    // await this.js.publish(this.subject, Buffer.from(JSON.stringify(data)));
    await this.js.publish(this.subject, Buffer.from(data))
  }
}