import Block from '../../core/block'
import { FormComponent } from './components/form/form-component'

interface IProps {
  close: () => void
}

export default class PopupComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      events: {
        click: (e) => {
          const el = e.target as HTMLInputElement
          if (el.getAttribute('data-closePopup') !== null) {
            this.setProps({ isError: false })
            props.close()
          }
        },
      },
      form: new FormComponent({
        close: () => props.close(),
      }),
    })
  }

  beforeMount() {
    if (this.element && !this.props.isOpen) {
      this.hide()
    }
  }

  render() {
    return `
      <div data-setevent data-closePopup class='popup'>
        {{{ form }}}
      </div>
    `
  }
}
