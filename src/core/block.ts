import EventBus from './event-bus'
import Handlebars from 'handlebars'
import { nanoid } from 'nanoid'

interface IPropsWithChildren {
  [keys: string]: unknown
  events?: IEvents
}

type Events = keyof HTMLElementEventMap

type IEvents = {
  [keys in Events]?: (val?: any) => void
}

// interface IChildren {
//   [keys: string]: Block
// }

interface IMeta {
  tagName: string
}

export default class Block {
  props: IPropsWithChildren
  private _meta: IMeta
  private eventBus: EventBus
  private _element: Element | null = null
  children: Record<string, Block>
  private _id: string

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  constructor(tagName = 'div', propsWithChildren: IPropsWithChildren) {
    this._meta = {
      tagName,
    }
    this._id = nanoid(6)
    const { props, children } = this._getChildrenAndProps(propsWithChildren)
    this.children = children
    this.props = this._makePropsProxy(props)
    this.eventBus = new EventBus()

    this._registerEvents(this.eventBus)
    this.eventBus.emit(Block.EVENTS.INIT)
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
  }

  _createResources() {
    const { tagName } = this._meta
    this._element = this._createDocumentElement(tagName)
  }

  init() {
    this._createResources()
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER)
  }

  _addEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach((event) => {
      const handler = events[event as keyof typeof events]!
      const isElementForEvent = (val: string): boolean => {
        return val === 'A' || val === 'INPUT'
      }
      if (isElementForEvent(this._element!.nodeName)) {
        this._element!.addEventListener(event, handler)
      }

      this._element?.childNodes.forEach((element) => {
        if (isElementForEvent(element.nodeName)) {
          element.addEventListener(event, handler)
        }
      })
    })
  }

  _componentDidMount() {
    this.componentDidMount()
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM)
  }

  _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    if (
      oldProps &&
      newProps &&
      typeof oldProps === 'object' &&
      typeof newProps === 'object'
    ) {
      const response = this.componentDidUpdate(oldProps, newProps)
      if (!response) {
        return
      }
      this._render()
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps?: object, newProps?: object) {
    if (oldProps !== newProps) {
      return true
    }
    return false
  }

  setProps = (nextProps: object) => {
    if (!nextProps) {
      return
    }
    Object.assign(this.props, nextProps)
  }

  get element() {
    return this._element
  }

  _getChildrenAndProps(value: IPropsWithChildren) {
    const props: IPropsWithChildren = {}
    const children: Record<string, Block> = {}

    Object.entries(value).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })
    return { props, children }
  }

  _render() {
    const propsAndStubs = { ...this.props }

    Object.entries(this.children).forEach(([key, value]) => {
      propsAndStubs[key] = `<div data-id="${value._id}"></div>`
    })

    const fragment = this._createDocumentElement(
      'template'
    ) as HTMLTemplateElement
    const block = this.render() as unknown as string
    fragment.innerHTML = Handlebars.compile(block)(propsAndStubs)
    const newElemenet = fragment.content.firstElementChild

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)
      stub?.replaceWith(child.getContent()!)
    })

    if (this._element) {
      this._element.replaceWith(newElemenet!)
    }
    this._element = newElemenet!

    this._addEvents()
    this._componentDidMount()
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.dispatchComponentDidMount()
        }
      }, 100)
    }

    return this.element
  }

  _makePropsProxy(props: IPropsWithChildren) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value: unknown) {
        const oldValue = { ...target }
        target[prop] = value
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName)
  }

  show() {
    const content = this.getContent()
    // content && content.style.display
    // content && content.style.display = "block";
  }

  hide() {
    const content = this.getContent()
    // content && content.style.display
    // content && content.style.display = "none";
  }
}
