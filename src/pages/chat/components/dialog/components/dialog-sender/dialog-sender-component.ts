import Block from '../../../../../../core/block'
import images from '../../../../../../utils/import-img'
import InputMessageComponent from '../input-message/input-message-component'
import PopupDialogSenderComponent from '../popup-dialog-sender/popup-dialog-sender-component'
import SendButtonComponent from '../send-button/send-button-component'

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
      button: new SendButtonComponent({
        sendIcon: images.sendIcon,
        onClick: () => {
          const inputVal = this.children.input.props.inputValue as string
          if (!inputVal) {
            this.children.input.setProps({ isError: true })
          } else {
            this.children.input.setProps({ isError: false })
            props.send(inputVal)
            this.children.input.setProps({ inputValue: '' })
          }
        },
      }),
    })
  }

  render() {
    return `
      <div class='dialog-sender'>
        <a class='dialog-sender__pin-btn btn-styles'>
          {{{ popupDialogSender }}}
          <img class='dialog-sender__pin-img' src={{pinIcon}} alt='Прикрепить' />
        </a>
        <div class='dialog-sender__input-wrapper'>
          {{{ input }}}
        </div>
        {{{ button }}}
      </div>
    `
  }
}
