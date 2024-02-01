import Block from '../../core/block'
import { IStore, store } from '../../store/store'
import connect from '../../utils/connect'

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
  avatarPlaceholder: string
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
    <div class='user-avatar'>
      {{#if isName}}
        <div data-setevent class='user-avatar__img-wrapper user-avatar__img-wrapper_useHover centered-content'>
          <img
            class='user-avatar__img'
            src={{avatarPlaceholder}}
            alt='Иконка аватара'
          />
          <p class='user-avatar__change-avatar'>Поменять аватар</p>
        </div>
        {{{ avatarName }}}
      {{else}}
        <div data-setevent class='user-avatar__img-wrapper centered-content'>
          <img
            class='user-avatar__img'
            src={{avatarPlaceholder}}
            alt='Иконка аватара'
          />
        </div>
      {{/if}}
    `
  }
}

function mapToProps(state: IStore) {
  return {
    profile: state.profile,
  }
}

export default connect(UserAvatarComponent, mapToProps)
