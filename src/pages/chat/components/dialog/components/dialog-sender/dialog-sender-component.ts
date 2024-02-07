import Block from '../../../../../../core/block'
import images from '../../../../../../utils/import-img'
import InputMessageComponent from '../input-message/input-message-component'
import PopupDialogSenderComponent from '../popup-dialog-sender/popup-dialog-sender-component'

interface IProps {
  pinIcon: string
  sendIcon: string
  send: (val: string) => void
}

export default class DialogSenderComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      popupDialogSender: new PopupDialogSenderComponent({
        fileIcon: images.fileIcon,
        imgIcon: images.imgIcon,
        locationIcon: images.locationIcon,
      }),
      input: new InputMessageComponent(),
    })
  }

  componentDidMount(): void {
    const form = document.querySelector('.dialog-sender__input-wrapper')
    const input = document.querySelector('.dialog-sender-wrapper__input') as HTMLInputElement
    form?.addEventListener('submit', (e: Event) => {
      e.preventDefault()
      const inputVal = input.value
      if (!inputVal) {
        this.children.input.setProps({ isError: true })
      } else {
        this.children.input.setProps({ isError: false })
        const send = this.props.send as (val: string) => void
        send(inputVal)
        this.children.input.setProps({ inputValue: '' })
      }
    })
  }

  render() {
    return `
      <div class='dialog-sender'>
        <a class='dialog-sender__pin-btn btn-styles'>
          {{{ popupDialogSender }}}
          <img class='dialog-sender__pin-img' src={{pinIcon}} alt='Прикрепить' />
        </a>
        <form class='dialog-sender__input-wrapper'>
          {{{ input }}}
          <button data-setevent type='submit' class='dialog-sender__send-btn btn-styles'>
            <img class='dialog-sender__send-img' src={{sendIcon}} alt='Отправить' />
          </button>
        </form>
      </div>
    `
  }
}
