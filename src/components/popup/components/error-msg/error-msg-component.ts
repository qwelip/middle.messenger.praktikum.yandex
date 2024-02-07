import Block from '../../../../core/block'

interface IProps {
  errorCaption: string
}

export default class ErrorMsgComponent extends Block {
  constructor(props: IProps) {
    super('p', {
      ...props,
    })
  }

  render() {
    return `
        <p class='popup__error text-style text-style_size_12 text-style_color_red'>
          {{ errorCaption }}
        </p>
      `
  }
}
