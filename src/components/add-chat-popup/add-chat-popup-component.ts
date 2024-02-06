import { notEmptyValidate, userIdValidate } from '../../common/validate'
import Block from '../../core/block'
import { addUsersToChat, createChat, getChats } from '../../services/chat'
import { store } from '../../store/store'
import { ButtonComponent } from '../button/button-component'
import InputComponent from '../input/input-component'

interface IProps {
  close: () => void
}

export default class AddChatPopupComponent extends Block {
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
      chatName: new InputComponent({
        name: 'chatName',
        type: 'text',
        errorMsg: 'Неверное значение',
        validateFn: notEmptyValidate,
      }),
      userId: new InputComponent({
        name: 'userId',
        type: 'text',
        errorMsg: 'Неверное значение',
        validateFn: notEmptyValidate,
      }),
      button: new ButtonComponent({
        caption: 'Добавить',
        onClick: async () => {
          const chatNameComp = this.children.chatName
          const userIdComp = this.children.userId
          const chatName = (chatNameComp.props.inputValue as string) || ''
          const userId = (userIdComp.props.inputValue as string) || ''

          if (notEmptyValidate(chatName)) {
            chatNameComp.setProps({ isError: false })
          } else {
            chatNameComp.setProps({ isError: true })
            return
          }

          if (notEmptyValidate(userId) && userIdValidate(userId)) {
            userIdComp.setProps({ isError: false })
          } else {
            userIdComp.setProps({ isError: true })
            return
          }

          try {
            const newChat = await createChat({ title: chatName })
            if (!newChat?.id) {
              throw new Error('Id пользователя не найден')
            }
            const chats = await getChats({
              offset: 0,
              limit: 100,
            })
            store.set('chats', chats)

            await addUsersToChat({ chatId: newChat.id, users: [+userId] })
            this.hide()
          } catch (error) {
            if (error instanceof Error) {
              this.setProps({ errorMsg: error.message })
            }
          }
        },
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
      <form id='chatForm' name='chatForm' class='popup__window button-add-chat__popup horizon-centered-content'>
          <h2 class='popup__title button-add-chat__title'>Создать диалог</h2>
            <div class='login__input button-add-chat__input'>
              <label for='input' class='input-label text-style_color_gray'>Название чата</label>
              {{{ chatName }}}
            </div>
            <div class='login__input button-add-chat__input'>
              <label for='input' class='input-label text-style_color_gray'>Id пользователя</label>
              {{{ userId }}}
            </div>
            <a data-setevent class='button button-add-chat'>
              {{{ button }}}
            </a>
            {{#if errorMsg}}
              <p class='login__error text-style text-style_size_12 text-style_color_red'>
                {{ errorMsg }}
              </p>
            {{/if}}
        </form>
      </div>
    `
  }
}
