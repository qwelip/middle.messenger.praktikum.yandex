import ImgComponent from '../../../../../../components/user-avatar/components/img/img-component'
import Block from '../../../../../../core/block'
import { deleteUserFromChat } from '../../../../../../services/chat'
import { getAvatar } from '../../../../../../services/resources'
import { IStore, store } from '../../../../../../store/store'
import connect from '../../../../../../utils/connect'
import images from '../../../../../../utils/import-img'
import PopupDialogHeaderComponent from '../popup-dialog-header/popup-dialog-header-component'

interface IUserName {
  name: string
}
class UserName extends Block {
  constructor(props: IUserName) {
    super('p', {
      ...props,
    })
  }

  render() {
    return `
      <p class='dialog-header__name text-style text-style_type_bold'>{{name}}</p>
    `
  }
}

type IProps = {
  contextMenuIcon: string
}

class DialogHeaderComponent extends Block {
  constructor(tagName: string, props: IProps) {
    super(tagName, {
      ...props,
      popupDialog: new PopupDialogHeaderComponent({
        addIcon: images.addIcon,
        deleteIcon: images.deleteIcon,
        onClick: async () => {
          const { notAdminUserId, selectedChat } = store.getState()
          if (notAdminUserId && selectedChat) {
            try {
              await deleteUserFromChat({
                chatId: +selectedChat,
                users: [+notAdminUserId],
              })
              console.log('Пользователь успешно удален')
            } catch (error) {
              console.log('Ошибка при удалении пользователя')
            }
          }
        },
      }),
      avatar: new ImgComponent({
        imgSrc: images.avatarPlaceholder,
        isNoAvatar: true,
        isSmall: true,
      }),
      userName: new UserName({
        name: store.getState().user?.first_name || '',
      }),
    })
  }

  componentDidMount() {
    const { user, profile, avatar, selectedChat } = store.getState()

    if (!selectedChat) {
      this.children.popupDialog.setProps({ isSelectedChat: false })
    }
    if (selectedChat) {
      this.children.popupDialog.setProps({ isSelectedChat: true })
    }

    const avatarSrc = avatar || user?.avatar
    if (avatarSrc) {
      getAvatar(avatarSrc)
        .then((res) => {
          this.children.avatar.setProps({ isNoAvatar: false })
          this.children.avatar.setProps({ imgSrc: res?.responseURL })
        })
        .catch((err) => console.log('err', err))
    } else {
      this.children.avatar.setProps({ isNoAvatar: true })
    }

    if (profile) {
      this.children.userName.setProps({ name: profile?.first_name })
    } else {
      this.children.userName.setProps({ name: user?.first_name })
    }
  }

  render() {
    return `
      <div class='dialog-header'>
        <div class='dialog-header__info'>
          <div class='dialog-header__avatar'>
            {{{ avatar }}}
          </div>
          {{{ userName }}}
        </div>
        <a class='dialog-header__context-btn btn-styles'>
          <img
            class='dialog-header__btn-img'
            src={{contextMenuIcon}}
            alt='Контекстное меню'
          />
          {{{ popupDialog }}}
        </a>
      </div>
    `
  }
}

function mapToProps(state: IStore) {
  return {
    profile: state.profile,
  }
}

export default connect(DialogHeaderComponent, mapToProps)
