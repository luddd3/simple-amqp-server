import { Declare } from './frames/exchange/declare'

type ExchangeType = 'direct' | 'fanout' | 'topic' | 'headers' | 'match'

class Exchange {
  public readonly name: string
  public readonly type: ExchangeType
  public readonly passive: boolean
  public readonly durable: boolean
  public readonly autoDelete: boolean
  public readonly internal: boolean
  public readonly noWait: boolean
  public readonly arguments: object

  constructor(declaration: Declare) {
    this.name = declaration.exchange
    this.type = declaration.type
    this.passive = declaration.passive
    this.durable = declaration.durable
    this.autoDelete = declaration.autoDelete
    this.internal = declaration.internal
    this.noWait = declaration.noWait
    this.arguments = declaration.arguments
  }
}

export { Exchange, ExchangeType }
