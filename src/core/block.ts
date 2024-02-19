// eslint-disable-next-line import/no-extraneous-dependencies
import Handlebars from 'handlebars'
import { nanoid } from 'nanoid'
import EventBus from './event-bus'

export type RefType = {
  // eslint-disable-next-line no-use-before-define
  [key: string]: Element
}

type HTMLEvents = keyof HTMLElementEventMap

type IEvents = {
  [keys in HTMLEvents]?: (val: Event) => void
}
export interface IPropsWithChildren {
  [keys: string]: unknown
  events?: IEvents
}

export interface IOldNewProps {
  oldProps?: IPropsWithChildren
  newProps: IPropsWithChildren
}

interface IMeta {
  tagName: string
}

export default class Block {
  props: IPropsWithChildren
  private _renderCounter: number
  private _meta: IMeta
  private _rootQuery: string
  private eventBus: () => EventBus
  private _element: Element | null = null
  // eslint-disable-next-line no-use-before-define
  children: Record<string, Block>
  refs = {} as RefType
  id: string

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  constructor(tagName: string, propsWithChildren: IPropsWithChildren) {
    this._renderCounter = 0
    this._rootQuery = 'app'
    const eventBus = new EventBus()
    this.eventBus = () => eventBus
    this._meta = {
      tagName: tagName || 'div',
    }
    this.id = nanoid(6)
    const { props, children } = this._getChildrenAndProps(propsWithChildren)
    this.children = children
    this.props = this._makePropsProxy(props)

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
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
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  _addEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach((event) => {
      const handler = events[event as keyof typeof events]!
      if (this._element!.getAttribute('data-setevent') !== null) {
        this._element!.addEventListener(event, handler)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this._element?.childNodes.forEach((element: any) => {
        if (element.tagName && element.getAttribute('data-setevent') !== null) {
          element.addEventListener(event, handler)
        }
      })
    })
  }

  _removeEvents() {
    const { events = {} } = this.props
    Object.keys(events).forEach((event) => {
      const handler = events[event as keyof typeof events]!
      if (this._element!.getAttribute('data-setevent') !== null) {
        this._element!.removeEventListener(event, handler)
      }
      this._element?.childNodes.forEach((element) => {
        if (element instanceof Element && element.getAttribute('data-setevent') !== null) {
          element.removeEventListener(event, handler)
        }
      })
    })
  }

  _componentDidMount() {
    this.componentDidMount()
  }

  _beforeMount() {
    this.beforeMount()
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
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

    Object.entries(value).forEach(([key, prop]) => {
      if (prop instanceof Block) {
        children[key] = prop
      } else {
        props[key] = prop
      }
    })
    return { props, children }
  }

  _componentDidUpdate(oldProps: IPropsWithChildren | undefined, newProps: IPropsWithChildren) {
    const response = this.componentDidUpdate({ oldProps, newProps })
    if (!response) {
      return
    }
    this._render()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_val?: IOldNewProps) {
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private compile(template: string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs }

    Object.entries(this.children).forEach(([key, child]) => {
      contextAndStubs[key] = `<div data-id="${child.id}"></div>`
    })

    const html = Handlebars.compile(template)(contextAndStubs)

    const temp = document.createElement('template')

    temp.innerHTML = html
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(temp.content)
    })

    Object.values(this.children).forEach((child) => {
      const stub = temp.content.querySelector(`[data-id="${child.id}"]`)
      stub?.replaceWith(child.getContent()!)
    })

    return temp.content
  }

  _render() {
    this._removeEvents()
    const fragment = this.compile(this.render(), this.props)

    const newElement = fragment.firstElementChild as HTMLElement

    if (this._element) {
      this._element.replaceWith(newElement)
    }

    this._element = newElement

    this._addEvents()

    if (this._renderCounter === 0) {
      this._beforeMount()
    }

    this._addEvents()
    this._componentDidMount()
    this._renderCounter += 1
  }

  render() {
    return ''
  }

  beforeMount() {}

  getContent() {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.dispatchComponentDidMount()
        }
      }, 100)
    }

    return this.element
  }

  _makePropsProxy(props: IPropsWithChildren) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value: unknown) {
        const oldValue = { ...target }
        // eslint-disable-next-line no-param-reassign
        target[prop] = value
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName)
  }

  show() {
    const element = this._element as HTMLElement
    element.style.display = 'flex'
  }

  hide() {
    const element = this._element as HTMLElement
    element.style.display = 'none'
  }

  unmount() {
    const root = document.getElementById(this._rootQuery)!
    root.firstChild?.remove()
  }
}
