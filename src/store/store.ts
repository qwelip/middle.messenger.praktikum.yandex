import EventBus from '../core/event-bus'
import { IUser } from '../models/data-models'
import { setValueToObject } from '../utils/set-value-to-object'

export enum StoreEvents {
  Updated = 'updated',
}

export interface IStore {
  [key: string]: unknown
  user: IUser | null
}

export const initStore: IStore = {
  user: null,
}

export class Store extends EventBus {
  private state: IStore

  constructor(state: IStore) {
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
