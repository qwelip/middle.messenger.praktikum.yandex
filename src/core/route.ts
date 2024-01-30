import Block from './block'

interface IProps {
  rootQuery: string
}

function render(query: string, block: Block | null) {
  const root = document.getElementById(query)!
  root.append(block!.element!)
  return root
}

export class Route {
  private _pathname: string
  // todom
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _blockClass: any
  private _block: Block | null
  private _props: IProps

  constructor(pathname: string, view: object, props: IProps) {
    this._pathname = pathname
    this._blockClass = view
    this._block = null
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render()
    }
  }

  leave() {
    if (this._block) this._block.unmount()
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass()
      render(this._props.rootQuery, this._block)
      return
    }
    render(this._props.rootQuery, this._block)
  }
}
