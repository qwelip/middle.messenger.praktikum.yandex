import SideButtonComponent from '../../components/side-button/side-button-component'
import UserAvatarComponent from '../../components/user-avatar/user-avatar-component'
import UserInfoChangeComponent from '../../components/user-info-change/user-info-change-component'
import Block from '../../core/block'
import { router } from '../../core/router'
import images from '../../utils/import-img'
import { ChangePasswordForm } from './components/change-password-form'

export default class ChangePasswordPage extends Block {
  constructor() {
    super('main', {
      sideButton: new SideButtonComponent({
        goBackIcon: images.goBackIcon,
        onClick: () => router.back(),
      }),
      userAvatar: new UserAvatarComponent('div', {
        isName: false,
        avatarPlaceholder: images.avatarPlaceholder,
      }),
      form: new ChangePasswordForm(),
      userInfo: new UserInfoChangeComponent('div', {}),
    })
  }

  render() {
    return `
      <main class='change-password horizontal-centered'>
        <div class='change-password__wrapper user-entitys-wrapper'>
          {{{ sideButton }}}
          {{{ userAvatar }}}
          {{{ form }}}
        </div>
      </main>
    `
  }
}
