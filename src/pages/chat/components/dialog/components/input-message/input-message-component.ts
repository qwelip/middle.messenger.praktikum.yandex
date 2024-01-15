import Block from '../../../../../../core/block'

export default class InputMessageComponent extends Block {
  constructor() {
    super('input', {})
  }

  render() {
    return `
      <input
        name='message'
        class='dialog-sender__input text-style text-style_color_gray'
        type='text'
        placeholder='Сообщение'
      />
    `
  }
}
