import { AmqpFrameReader } from '../amqp-frame-reader'

class Close {
  public replyCode: number;
  public replyText: string;

  constructor(data: Buffer) {
    const amqpReader = new AmqpFrameReader(data)

    // re-read class and method ids
    amqpReader.readShort()
    amqpReader.readShort()

    this.replyCode = amqpReader.readShort()
    this.replyText = amqpReader.readShortstr()
  }
}

export { Close }
