import Block from '../../../../../../core/block'

interface IProps {
  date: string
}

export default class DialogDateComponent extends Block {
  constructor(props: IProps) {
    super('p', {
      ...props,
    })
  }

  render() {
    return `
    <p class='dialog-date text-style text-style_color_gray text-style_size_12'>
      {{date}}
    </p>
    `
  }
}
