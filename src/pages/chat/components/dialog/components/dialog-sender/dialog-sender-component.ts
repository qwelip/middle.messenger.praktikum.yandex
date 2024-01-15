import Block from '../../../../../../core/block'
import images from '../../../../../../utils/import-img'
import InputMessageComponent from '../input-message/input-message-component'
import PopupDialogSenderComponent from '../popup-dialog-sender/popup-dialog-sender-component'

interface IProps {
  pinIcon: string
  sendIcon: string
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

  render() {
    return `
      <div class='dialog-sender'>
        <a class='dialog-sender__pin-btn btn-styles'>
          {{{ popupDialogSender }}}
          <img class='dialog-sender__pin-img' src={{pinIcon}} alt='Прикрепить' />
        </a>
        <div class="dialog-sender__input-wrapper">
          {{#> Form}}
            {{{ input }}}
          {{/Form}}
        </div>
        <a class='dialog-sender__send-btn btn-styles'>
          <img class='dialog-sender__send-img' src={{sendIcon}} alt='Отправить' />
        </a>
      </div>
    `
  }
}
