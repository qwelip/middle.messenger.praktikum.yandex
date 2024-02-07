import AddUserToChatComponent from '../../../../../../components/add-user-to-chat/add-user-to-chat-component'
import DeleteUserFromChatComponent from '../../../../../../components/delete-user-from-chat/delete-user-from-chat-component'
import Block from '../../../../../../core/block'
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
      deleteUserFromChat: new DeleteUserFromChatComponent(),
      addUserBtn: new PopupBtn({
        imgSrc: props.addIcon,
        title: 'Добавить пользователя',
        onClick: () => this.children.addUserToChatPopup.show(),
      }),
      deleteUserBtn: new PopupBtn({
        imgSrc: props.deleteIcon,
        title: 'Удалить пользователя',
        onClick: async () => {
          this.children.deleteUserFromChat.show()
        },
      }),
    })
  }

  render() {
    return `
      <div data-setevent class='popup-dialog-header popup-dialog-header_hidden'>
        {{#if isSelectedChat}}
          {{{ addUserToChatPopup }}}
          {{{ deleteUserFromChat }}}
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
