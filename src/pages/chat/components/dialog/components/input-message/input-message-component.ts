import Block from '../../../../../../core/block'

export default class InputMessageComponent extends Block {
  constructor() {
    super('input', {
      events: {
        blur: (ev) => {
          const element = ev.target as HTMLInputElement
          this.setProps({ inputValue: element.value })
          if (element.value.length === 0) {
            this.setProps({ isError: true })
          } else {
            this.setProps({ isError: false })
          }
        },
      },
    })
  }

  render() {
    return `
    <div class='dialog-sender-wrapper__form'>
      <input
        data-setevent
        name='message'
        class='dialog-sender-wrapper__input text-style text-style_color_gray'
        type='text'
        value='{{inputValue}}'
        placeholder='Сообщение'
      />
      {{#if isError}}
        <label for='message' class='input-label input-label_msg-error text-style_color_red'>
          Нельзя отправлять пустое сообщение
        </label>
      {{/if}}
    </div>
    `
  }
}
