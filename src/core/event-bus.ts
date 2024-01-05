export type Listener = (...args: unknown[]) => void

// todom спросить зачем мы присваиваем string = string, зачем так сложно определять типы
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

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    )
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args)
    })
  }
}
