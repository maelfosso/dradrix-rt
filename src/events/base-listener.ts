import * as nats from 'nats';
import { AckPolicy, createInbox, JsMsg, StringCodec } from 'nats';
import { Event } from './event';

export abstract class Listener<T extends Event> {
  abstract subject: T['subject'];
  abstract stream: T['stream'];
  abstract onMessage(data: T['data'], msg: JsMsg): void;
  private jsm: nats.JetStreamManager;
  private js: nats.JetStreamClient;
  protected ackWait = 5 * 1000;

  constructor(jsm: nats.JetStreamManager, js: nats.JetStreamClient) {
    this.jsm = jsm;
    this.js = js;
  }

  setup() {
    // check if stream exists
    // add subject to the stream
  }

  async listen() {
    const inbox = createInbox();

    let consumer;
    try {
      consumer = await this.jsm.consumers.info(this.stream, "me");
    } catch (err) {
      consumer = await this.jsm.consumers.add(this.stream, {
        durable_name: "me",
        ack_policy: AckPolicy.Explicit,
        deliver_subject: inbox
      });
    }

    const opts = nats.consumerOpts();
    opts.bind(this.stream, "me");

    let sub = await this.js.subscribe(this.subject, opts);
    const done = (async () => {
      for await (const msg of sub) {
        const parseData = this.parseMessage(msg);
        console.log(`Received a message [${msg.seq}] ${parseData}`);
        this.onMessage(parseData, msg);
      }
    })();

    await done;
  }

  parseMessage(msg: nats.JsMsg) {
    const data = msg.data;
    const sc = StringCodec();

    return JSON.parse(sc.decode(data));
  }
}