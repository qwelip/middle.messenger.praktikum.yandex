import Block from '../../core/block'

interface IProps {
  name?: string
  avatarPlaceholder: string
  onClick: () => void
}

export default class UserAvatarComponent extends Block {
  constructor(props: IProps) {
    super('main', {
      ...props,
      events: {
        click: () => props.onClick(),
      },
    })
  }

  render() {
    return `
    <div class='user-avatar'>
      <div data-setevent class='user-avatar__img-wrapper centered-content' page='newAvatarPage'>
        <img
          class='user-avatar__img'
          src={{avatarPlaceholder}}
          alt='Иконка аватара'
          page='newAvatarPage'
        />
        <p class='user-avatar__change-avatar' page='newAvatarPage'>Поменять аватар</p>
      </div>
      {{#if name}}
        <h2 class='user-avatar__name'>{{name}}</h2>
      {{/if}}
    </div>
    `
  }
}
