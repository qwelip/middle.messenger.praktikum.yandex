import Block from '../../../../../../core/block'
import { deleteUserFromChat, getChatUsers } from '../../../../../../services/chat'
import { store } from '../../../../../../store/store'

interface IProps {
  addIcon: string
  deleteIcon: string
  onClick: () => void
}

export default class PopupDialogHeaderComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      events: {
        click: async () => {
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
      },
    })
  }

  render() {
    return `
      <div data-setevent class='popup-dialog-header popup-dialog-header_hidden'>
        <div class='popup-item btn-styles' >
          <img
            class='popup-dialog-header_img popup-item__img'
            src={{deleteIcon}}
            alt='Удалить пользователя'
          />
          <p class='popup-item__text text-style'>Удалить пользователя</p>
        </div>
      </div>
    `
  }
}
