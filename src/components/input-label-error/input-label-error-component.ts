import Block from '../../core/block'

interface IProps {
  forName: string
  errorMsg: string
}

export default class InputLabelErrorComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
    })
  }

  render() {
    return `
     <label
      for={{forName}}
      class='input-label input-label_error text-style_color_red'
    >
      {{errorMsg}}
    </label>
    `
  }
}
