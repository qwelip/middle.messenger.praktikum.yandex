import Block from '../../../../../../core/block'

interface IProps {
  arrowIcon: string
  onClick: () => void
}

export default class ProfileBtnComponent extends Block {
  constructor(props: IProps) {
    super('a', {
      ...props,
      events: {
        click: () => props.onClick(),
      },
    })
  }

  render() {
    return `
      <a data-setevent class='profile-btn btn-styles'>
        <p class='profile-btn__text text-style text-style_color_gray'>
          Профиль
        </p>
        <img
          src={{arrowIcon}}
          alt='Профиль'
          class='profile-btn__img'
          page='profilePage'
        />
      </a>
    `
  }
}
