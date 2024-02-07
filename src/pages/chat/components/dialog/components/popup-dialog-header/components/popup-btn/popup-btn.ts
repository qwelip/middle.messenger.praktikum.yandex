import Block from '../../../../../../../../core/block'

interface IProps {
  imgSrc: string
  title: string
  onClick: () => void
}

export default class PopupBtn extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      events: {
        click: () => {
          props.onClick()
        },
      },
    })
  }

  render() {
    return `
      <div data-setevent class='popup-item btn-styles' >
        <img
          class='popup-dialog-header_img popup-item__img'
          src={{imgSrc}}
          alt={{title}}
        />
        <p class='popup-item__text text-style'>{{title}}</p>
      </div>
    `
  }
}
