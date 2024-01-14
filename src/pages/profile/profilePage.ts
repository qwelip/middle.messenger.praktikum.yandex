import { userInfoMocData } from '../../common/user-info-moc-data'
import ButtonStringComponent from '../../components/button-string/button-string-component'
import PopupComponent from '../../components/popup/popup-component'
import SideButtonComponent from '../../components/side-button/side-button-component'
import UserAvatarComponent from '../../components/user-avatar/user-avatar-component'
import UserInfoComponent from '../../components/user-info/user-info-component'
import Block, { IPropsCompare, IPropsWithChildren } from '../../core/block'
import images from '../../utils/import-img'

interface IProps {
  isPopupShow: boolean
}

export default class ProfilePage extends Block {
  constructor(props: IProps) {
    super('main', {
      ...props,
      sideButton: new SideButtonComponent({
        page: 'changeUserDataPage',
        goBackIcon: images.goBackIcon,
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
        page: 'changeUserDataPage',
        isRed: false,
      }),
      buttonChangePassword: new ButtonStringComponent({
        caption: 'Изменить пароль',
        page: 'changePasswordPage',
        isRed: false,
      }),
      buttonExit: new ButtonStringComponent({
        caption: 'Выйти',
        page: 'loginPage',
        isRed: true,
      }),
      userInfo: new UserInfoComponent({ data: userInfoMocData }),
      popup: new PopupComponent({
        isOpen: props.isPopupShow,
        caption: 'Загрузите файл',
        btnCaption: 'Поменять',
        page: 'profilePage',
        onClick: () => {
          this.setProps({ isPopupShow: false })
        },
        content: new ButtonStringComponent({
          caption: 'Выбрать файл на компьютере',
          isRed: false,
          page: '',
        }).element,
      }),
    })
  }

  componentDidUpdate(oldProps: IPropsCompare, newProps: IPropsWithChildren) {
    const isPopupShow = newProps.isPopupShow
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
      {{{ sideButton }}}
      {{{ popup }}}
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
