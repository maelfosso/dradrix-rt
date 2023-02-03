import nats, { JetStreamManager } from "nats";

export class BaseNats {
  private jsm: JetStreamManager;

  constructor(jsm: JetStreamManager) {
    this.jsm = jsm;
  }

  async checkStreamOrCreate(name: string): Promise<nats.StreamInfo>  {
    let streamInfo: nats.StreamInfo;

    const stream = await this.jsm.streams.find(name);
    if (stream) {
      streamInfo = await this.jsm.streams.info(stream)!;
    } else {
      streamInfo = await this.jsm.streams.add({ name, subjects: [`${name}:*`]})!
    }

    return streamInfo;
  }

  async addSubjectToStream(streamInfo: nats.StreamInfo, subject: string): Promise<nats.StreamInfo> {
    if (!streamInfo?.config.subjects?.find(s => s === subject)) {
      streamInfo?.config.subjects?.push(subject);
      await this.jsm.streams.update(streamInfo.config.name, streamInfo?.config);
    }

    return streamInfo
  }
}
