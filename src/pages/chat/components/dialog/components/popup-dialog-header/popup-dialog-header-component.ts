import AddUserToChatComponent from '../../../../../../components/add-user-to-chat/add-user-to-chat-component'
import Block from '../../../../../../core/block'
import { deleteUserFromChat, getChatUsers } from '../../../../../../services/chat'
import { store } from '../../../../../../store/store'
import PopupBtn from './components/popup-btn/popup-btn'

interface IProps {
  addIcon: string
  deleteIcon: string
  onClick: () => void
}

export default class PopupDialogHeaderComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      addUserToChatPopup: new AddUserToChatComponent(),
      addUserBtn: new PopupBtn({
        imgSrc: props.addIcon,
        title: 'Добавить пользователя',
        onClick: () => this.children.addUserToChatPopup.setProps({ isPopupShow: true }),
      }),
      deleteUserBtn: new PopupBtn({
        imgSrc: props.deleteIcon,
        title: 'Удалить пользователя',
        onClick: async () => {
          const { selectedChat, user } = store.getState()
          if (selectedChat && user) {
            const usersChat = await getChatUsers({ id: +selectedChat })
            const anotherUserId = usersChat!.find((i) => i.id !== user.id)!.id
            try {
              await deleteUserFromChat({
                chatId: +selectedChat,
                users: [+anotherUserId],
              })
              console.log('Пользователь успешно удален')
            } catch (error) {
              console.log('Ошибка при удалении пользователя')
            }
          }
          props.onClick()
        },
      }),
    })
  }

  render() {
    return `
      <div data-setevent class='popup-dialog-header popup-dialog-header_hidden'>
        {{#if isSelectedChat}}
          {{{ addUserToChatPopup }}}
          {{{ addUserBtn }}}
          <div class='popup-dialog-header__divider'></div>
          {{{ deleteUserBtn }}}
        {{else}}
          <p class='popup-item__text text-style'>Выберите чат</p>
        {{/if}}
      </div>
    `
  }
}
