import SideButtonComponent from '../../components/side-button/side-button-component'
import UserAvatarComponent from '../../components/user-avatar/user-avatar-component'
import UserInfoChangeComponent from '../../components/user-info-change/user-info-change-component'
import Block from '../../core/block'
import { router } from '../../core/router'
import images from '../../utils/import-img'

export default class ChangeUserDataPage extends Block {
  constructor() {
    super('main', {
      sideButton: new SideButtonComponent({
        goBackIcon: images.goBackIcon,
        onClick: () => router.back(),
      }),
      userAvatar: new UserAvatarComponent({
        avatarPlaceholder: images.avatarPlaceholder,
      }),
      userInfo: new UserInfoChangeComponent(),
    })
  }

  render() {
    return `
      <main class='change-user-data horizontal-centered'>
        <div class='change-user-data__wrapper user-entitys-wrapper'>
          {{{ sideButton }}}
          {{{ userAvatar }}}
          {{{ userInfo }}}
        </div>
      </main>
    `
  }
}
