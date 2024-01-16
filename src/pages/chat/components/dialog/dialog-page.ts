import Block from '../../../../core/block'
import images from '../../../../utils/import-img'
import DialogContentComponent from './components/dialog-content/dialog-content-component'
import DialogHeaderComponent from './components/dialog-header/dialog-header-component'
import DialogSenderComponent from './components/dialog-sender/dialog-sender-component'

interface IProps {
  isEmpty: boolean
}

export default class DialogPage extends Block {
  constructor(props: IProps) {
    super('section', {
      ...props,
      dialogHeader: new DialogHeaderComponent({
        contextMenuIcon: images.contextMenuIcon,
        name: 'Ваня',
      }),
      dialogContent: new DialogContentComponent(),
      dialogSender: new DialogSenderComponent({
        pinIcon: images.pinIcon,
        sendIcon: images.sendIcon,
      }),
    })
  }

  render() {
    return `
      <section class='dialog'>
        {{#if isEmpty}}
          <p
            class='dialog__empty-cation text-style text-style_color_gray text-style_size_12'
          >Выберите чат чтобы отправить сообщение</p>
        {{else}}
          {{{ dialogHeader }}}
          {{{ dialogContent }}}
          {{{ dialogSender }}}
        {{/if}}
      </section>
    `
  }
}
