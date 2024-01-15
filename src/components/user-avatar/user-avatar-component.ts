import Block from '../../core/block'

interface IProps {
  name?: string
  avatarPlaceholder: string
  onClick?: () => void
}

export default class UserAvatarComponent extends Block {
  constructor(props: IProps) {
    super('main', {
      ...props,
      events: {
        click: () => props.onClick && props.onClick(),
      },
    })
  }

  render() {
    return `
    <div class='user-avatar'>
      {{#if name}}
        <div data-setevent class='user-avatar__img-wrapper user-avatar__img-wrapper_useHover centered-content'>
          <img
            class='user-avatar__img'
            src={{avatarPlaceholder}}
            alt='Иконка аватара'
          />
          <p class='user-avatar__change-avatar'>Поменять аватар</p>
        </div>
        <h2 class='user-avatar__name'>{{name}}</h2>
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
