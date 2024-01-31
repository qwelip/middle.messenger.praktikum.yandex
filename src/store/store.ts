import EventBus from '../core/event-bus'
import { Indexed, setValueToObject } from '../utils/setValueToObject'

export enum StoreEvents {
  Updated = 'updated',
}

export const initStore: Indexed = {
  user: null,
}

export class Store extends EventBus {
  private state: Indexed

  constructor(state: Indexed) {
    super()
    this.state = state
  }

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    setValueToObject(this.state, path, value)
    this.emit(StoreEvents.Updated)
  }
}

export const store = new Store(initStore)
