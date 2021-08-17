import { AmqpFrameWriter } from '../amqp-frame-writer'
import { ClassId, ConnectionMethodId, FrameType } from '../../constants'
import { Frame } from '../frame'

class CloseOk extends Frame {
  constructor(channelId?: number) {
    super(FrameType.Method, ClassId.Connnection, ConnectionMethodId.CloseOk, channelId ?? 0)
  }

  protected getPayload(): Buffer {
    const payload = new AmqpFrameWriter()
    return payload.toBuffer()
  }
}

export { CloseOk }
