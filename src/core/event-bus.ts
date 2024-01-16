import { IPropsWithChildren } from './block'

export type Listener = (...args: IPropsWithChildren[]) => void

export default class EventBus {
  private listeners: { [key in string]: Listener[] } = {}

  on(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback)
  }

  emit(event: string, ...args: IPropsWithChildren[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }
    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
