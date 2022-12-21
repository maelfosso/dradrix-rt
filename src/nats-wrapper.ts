// import nats, { Stan } from 'node-nats-streaming';
import * as nats from 'nats';

class NatsWrapper {
  private _nc?: nats.NatsConnection;
  private _jsm?: nats.JetStreamManager;

  get nc() {
    if (!this._nc) {
      throw new Error('Cannot access NATS before connecting');
    }

    return this._nc;
  }

  get jsm() {
    if (!this._jsm) {
      throw new Error('Cannot access JetStreamManager before connecting');
    }

    return this._jsm;
  }

  async connect(server: string) {
    this._nc = await nats.connect({ servers: server });
    console.log(`connected to ${this._nc.getServer()}`)

    this._jsm = await this._nc.jetstreamManager();
    // create the list of stream with their corresponding subjects
  }

  async checkStreamOrCreate(name: string): Promise<nats.StreamInfo>  {
    let streamInfo: nats.StreamInfo;

    const stream = await this._jsm?.streams.find(name);
    if (stream) {
      streamInfo = await this._jsm?.streams.info(stream)!;
    } else {
      streamInfo = await this._jsm?.streams.add({ name, subjects: [`${name}:*`]})!
    }

    return streamInfo;
  }

 async addSubjectToStream(streamInfo: nats.StreamInfo, subject: string): Promise<nats.StreamInfo> {
  streamInfo?.config.subjects?.push(subject);
  await this._jsm?.streams.update(streamInfo.config.name, streamInfo?.config);

  return streamInfo
 }

}

export const natsWrapper = new NatsWrapper();
