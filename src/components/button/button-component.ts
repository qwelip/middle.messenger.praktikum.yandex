import Block from '../../core/block'

interface IButtonComponent {
  caption: string
  page: string
  onClick: () => void
}

export class ButtonComponent extends Block {
  constructor(props: IButtonComponent) {
    super('a', {
      ...props,
      events: {
        click: () => props.onClick(),
      },
    })
  }

  render() {
    return `
      <a class='button' page={{page}}>
        <button type='submit' class='button__button'>
          {{caption}}
        </button>
      </a>
    `
  }
}
