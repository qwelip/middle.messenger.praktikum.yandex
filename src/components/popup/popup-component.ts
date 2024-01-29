import Block from '../../core/block'
import { convertElementToString } from '../../utils/utils'
import { ButtonComponent } from '../button/button-component'

interface IProps {
  isOpen: boolean
  caption: string
  btnCaption: string
  content: Element | null
  onClick: () => void
}

export default class PopupComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      events: {
        click: (e) => {
          const el = e.target as HTMLInputElement
          if (el.getAttribute('data-setevent') !== null) {
            props.onClick()
          }
        },
      },
      button: new ButtonComponent({
        caption: props.caption,
      }),
    })
  }

  beforeMount() {
    if (this.element && !this.props.isOpen) {
      this.hide()
    }
  }

  render() {
    const content = this.props.content as Element
    return `
      <div data-setevent class='popup'>
        <div class='popup__window horizon-centered-content'>
          <h2 class='popup__title'>{{caption}}</h2>
          <div class='popup__content'>
            ${convertElementToString(content)}
          </div>
          {{{ button }}}
        </div>
      </div>
    `
  }
}
