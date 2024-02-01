import EventBus from '../core/event-bus'
import { IUser } from '../models/dataModels'
import { setValueToObject } from '../utils/setValueToObject'

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
