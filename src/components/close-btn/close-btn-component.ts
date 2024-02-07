import Block from '../../core/block'
import images from '../../utils/import-img'

interface IProps {
  onClick: () => void
}

export default class CloseBtnComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      icon: images.deleteIcon,
      events: {
        click: () => {
          props.onClick()
        },
      },
    })
  }

  render() {
    return `
      <button data-setevent class='button__button'>
        <img
          class='popup-item__img'
          src={{icon}}
          alt='Удалить'
        />
      </button>
    `
  }
}
