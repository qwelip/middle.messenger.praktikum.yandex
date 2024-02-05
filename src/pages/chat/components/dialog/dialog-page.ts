import Block from '../../../../core/block'
import { getChatUsers } from '../../../../services/chat'
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
  ws: WebSocket | undefined
  constructor(tagName: string, props: IProps) {
    super(tagName, {
      ...props,
      dialogHeader: new DialogHeaderComponent('div', {
        contextMenuIcon: images.contextMenuIcon,
      }),
      dialogContent: new DialogContentComponent({
        isEmpty: true,
      }),
      dialogSender: new DialogSenderComponent({
        pinIcon: images.pinIcon,
        sendIcon: images.sendIcon,
        send: (val: string) => {
          if (this.ws) {
            this.ws.send(
              JSON.stringify({
                content: val,
                type: 'message',
              })
            )
          }
        },
      }),
    })
  }

  async componentDidMount() {
    if (this.ws) {
      this.ws.close(1000)
    }
    const { selectedChat, user } = store.getState()
    if (selectedChat && user) {
      this.children.dialogContent.setProps({ isEmpty: false })
      const token = await getChatUsers(selectedChat)
      this.ws = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${user.id}/${selectedChat}/${token?.token}`
      )
      this.ws.addEventListener('open', () => {
        console.log('Соединение установлено')
      })
      this.ws.addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто')
        } else {
          console.log('Обрыв соединения')
        }
        console.log(`Код: ${event.code} | Причина: ${event.reason}`)
      })
      this.ws.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        const messages = document.querySelector('.dialog-content')
        let msgTemplate: HTMLTemplateElement

        if (data.user_id === user.id) {
          msgTemplate = document.getElementById('myMsg')! as HTMLTemplateElement
        } else {
          msgTemplate = document.getElementById('recivedMsg')! as HTMLTemplateElement
        }
        const newMsg = msgTemplate.content
          .querySelector('.message-item')!
          .cloneNode(true) as HTMLElement
        const msgText = newMsg.querySelector('.message-item__text')
        msgText!.innerHTML = data.content
        messages!.append(newMsg)
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

        <template id='recivedMsg'>
          <div class='message-item'>
            <div class='message-item__body'>
              <p class='message-item__text text-style'></p>
              <div class='message-item__info'>
                <p class='message-item__data text-style text-style_color_gray text-style_size_12'></p>
              </div>
            </div>
          </div>
        </template>

        <template id='myMsg'>
          <div class='message-item'>
            <div class='message-item__body message-item__body_type_mine'>
              <p class='message-item__text text-style'></p>
              <div class='message-item__info'>
                <p class='message-item__data text-style text-style_color_blue text-style_size_12'></p>
              </div>
            </div>
          </div>
        </template>

      </section>
    `
  }
}

function mapToProps(state: IStore) {
  return {
    selectedChat: state.selectedChat,
  }
}

export default connect(DialogPage, mapToProps)
