import { AmqpFrameReader } from '../amqp-frame-reader'
import { ExchangeType } from '../../exchange'

class Declare {
  private static readonly exchangeTypes = [
    'direct',
    'fanout',
    'topic',
    'headers',
    'match'
  ]

  public readonly reserved1: number
  public readonly exchange: string
  public readonly type: ExchangeType
  public readonly passive: boolean
  public readonly durable: boolean
  public readonly autoDelete: boolean
  public readonly internal: boolean
  public readonly noWait: boolean
  public readonly arguments: object

  constructor(data: Buffer) {
    const amqpReader = new AmqpFrameReader(data)

    // re-read class and method ids
    amqpReader.readShort()
    amqpReader.readShort()

    this.reserved1 = amqpReader.readShort()
    this.exchange = amqpReader.readShortstr()
    const type = amqpReader.readShortstr()
    if (Declare.exchangeTypes.includes(type)) {
      this.type = type as ExchangeType
    } else {
      throw new Error('received bad exchange type')
    }

    const bits = amqpReader.readByte()
    this.passive = ((bits >> 0) & 1) === 1
    this.durable = ((bits >> 1) & 1) === 1
    this.autoDelete = ((bits >> 2) & 1) === 1
    this.internal = ((bits >> 3) & 1) === 1
    this.noWait = ((bits >> 4) & 1) === 1

    this.arguments = amqpReader.readTable()
  }
}

export { Declare }
