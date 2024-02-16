import Block from '../../core/block'
import { IStore, store } from '../../store/store'
import connect from '../../utils/connect'
import images from '../../utils/import-img'
import AvatarComponent from './components/avatar/avatar-component'

interface IAvatar {
  name: string
}

class UserAvatarName extends Block {
  constructor(props: IAvatar) {
    super('h2', {
      ...props,
    })
  }

  render() {
    return `
    <h2 class='user-avatar__name'>{{name}}</h2>
    `
  }
}

type IProps = {
  isName: boolean
  onClick?: () => void
}

class UserAvatarComponent extends Block {
  constructor(tagName: string, props: IProps) {
    super(tagName, {
      ...props,
      events: {
        click: () => props.onClick && props.onClick(),
      },
      avatarName: new UserAvatarName({
        name: store.getState().user?.first_name || '',
      }),
      avatar: new AvatarComponent('div', {
        avatarPlaceholder: images.avatarPlaceholder,
        isHover: true,
      }),
      avatarNoHover: new AvatarComponent('div', {
        avatarPlaceholder: images.avatarPlaceholder,
        isHover: false,
      }),
    })
  }

  componentDidMount() {
    const { user, profile } = store.getState()
    if (profile) {
      this.children.avatarName.setProps({ name: profile?.first_name })
    } else {
      this.children.avatarName.setProps({ name: user?.first_name })
    }
  }

  render() {
    return `
    <div data-setevent class='user-avatar'>
      {{#if isName}}
        {{{ avatar }}}
        {{{ avatarName }}}
      {{else}}
        {{{ avatarNoHover }}}
      {{/if}}
    </div>
    `
  }
}

function mapToProps(state: IStore) {
  return {
    profile: state.profile,
  }
}

export default connect(UserAvatarComponent, mapToProps)
