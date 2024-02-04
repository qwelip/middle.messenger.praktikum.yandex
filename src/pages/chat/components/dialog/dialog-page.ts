import Block from '../../../../core/block'
import { IStore, store } from '../../../../store/store'
import connect from '../../../../utils/connect'
import images from '../../../../utils/import-img'
import DialogContentComponent from './components/dialog-content/dialog-content-component'
import DialogHeaderComponent from './components/dialog-header/dialog-header-component'
import DialogSenderComponent from './components/dialog-sender/dialog-sender-component'

type IProps = {
  isEmpty: boolean
}

class DialogPage extends Block {
  constructor(tagName: string, props: IProps) {
    super(tagName, {
      ...props,
      dialogHeader: new DialogHeaderComponent('div', {
        contextMenuIcon: images.contextMenuIcon,
      }),
      dialogContent: new DialogContentComponent(),
      dialogSender: new DialogSenderComponent({
        pinIcon: images.pinIcon,
        sendIcon: images.sendIcon,
      }),
    })
  }

  componentDidMount() {
    const { token, chatId, user } = store.getState()
    if (token && chatId && user) {
      const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`)

      socket.addEventListener('open', () => {
        console.log('Соединение установлено')

        socket.send(
          JSON.stringify({
            content: 'Моё первое сообщение миру!',
            type: 'message',
          })
        )
      })
    }
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

function mapToProps(state: IStore) {
  return {
    token: state.token,
  }
}

export default connect(DialogPage, mapToProps)
