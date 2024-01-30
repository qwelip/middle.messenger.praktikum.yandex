import { userInfoMocData } from '../../common/user-info-moc-data'
import ButtonStringComponent from '../../components/button-string/button-string-component'
import PopupComponent from '../../components/popup/popup-component'
import SideButtonComponent from '../../components/side-button/side-button-component'
import UserAvatarComponent from '../../components/user-avatar/user-avatar-component'
import UserInfoComponent from '../../components/user-info/user-info-component'
import Block, { IOldNewProps } from '../../core/block'
import { router } from '../../core/router'
import images from '../../utils/import-img'

interface IProps {
  isPopupShow?: boolean
}

export default class ProfilePage extends Block {
  constructor(props?: IProps) {
    super('main', {
      ...props,
      sideButton: new SideButtonComponent({
        goBackIcon: images.goBackIcon,
        onClick: () => router.back(),
      }),
      userAvatar: new UserAvatarComponent({
        name: 'Иван',
        avatarPlaceholder: images.avatarPlaceholder,
        onClick: () => {
          this.setProps({ isPopupShow: true })
        },
      }),
      buttonChangeData: new ButtonStringComponent({
        caption: 'Изменить данные',
        isRed: false,
        onClick: () => router.go('/settings'),
      }),
      buttonChangePassword: new ButtonStringComponent({
        caption: 'Изменить пароль',
        isRed: false,
        onClick: () => router.go('/change-password'),
      }),
      buttonExit: new ButtonStringComponent({
        caption: 'Выйти',
        isRed: true,
        onClick: () => router.go('/'),
      }),
      userInfo: new UserInfoComponent({ data: userInfoMocData }),
      popup: new PopupComponent({
        isOpen: props?.isPopupShow || false,
        caption: 'Загрузите файл',
        btnCaption: 'Поменять',
        onClick: () => {
          this.setProps({ isPopupShow: false })
        },
        content: new ButtonStringComponent({
          caption: 'Выбрать файл на компьютере',
          isRed: false,
        }).element,
      }),
    })
  }

  componentDidUpdate({ newProps }: IOldNewProps) {
    const { isPopupShow } = newProps
    console.log('isPopupShow', isPopupShow)
    if (isPopupShow) {
      const popup = this.children.popup as Block
      popup.show()
    }
    if (!isPopupShow) {
      const popup = this.children.popup as Block
      popup.hide()
    }
    return true
  }

  render() {
    return `
    <main class='profile horizontal-centered'>
      {{{ popup }}}
      {{{ sideButton }}}
      <div class='profile__wrapper user-entitys-wrapper'>
        {{{ userAvatar }}}
        {{{ userInfo }}}
        <div class='profile__buttons'>
          <div class='profile__button'>
            {{{ buttonChangeData }}}
          </div>
          <div class='profile__button'>
            {{{ buttonChangePassword }}}
          </div>
          <div class='profile__button'>
            {{{ buttonExit }}}
          </div>
        </div>
      </div>
    </main>
    `
  }
}
