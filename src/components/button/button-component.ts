import Block from '../../core/block'

type IProps = {
  caption: string
  onClick?: () => void
}

export class ButtonComponent extends Block {
  constructor(props: IProps) {
    super('a', {
      ...props,
      events: {
        click: (e) => {
          e.preventDefault()
          // eslint-disable-next-line no-unused-expressions
          props.onClick && props.onClick()
        },
      },
    })
  }

  render() {
    return `
      <a data-setevent class='button'>
        <button type='submit' class='button__button'>
          {{caption}}
        </button>
      </a>
    `
  }
}
