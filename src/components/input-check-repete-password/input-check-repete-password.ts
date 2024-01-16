import { passwordRepeateValidate } from '../../common/validate'
import Block from '../../core/block'

interface IProps {
  target: string
  onInput?: (val: string) => void
}

export default class InputCheckRepetePasswordComp extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      events: {
        blur: (ev) => {
          const element = ev.target as HTMLInputElement
          this.setProps({ inputValue: element.value })
          if (element.value.length > 0) {
            if (passwordRepeateValidate(element.value, props.target)) {
              this.setProps({ isError: false })
            } else {
              this.setProps({ isError: true })
            }
          } else {
            this.setProps({ isError: false })
          }
        },
      },
    })
  }

  render() {
    return `
      <div>
        {{#if isError}}
          <input
            data-setevent
            class='input text-style text-style_color_red'
            name='repetePassword'
            type='password'
            value='{{inputValue}}'
          />
        {{else}}
          <input
            data-setevent
            class='input text-style'
            name='repetePassword'
            type='password'
            value='{{inputValue}}'
          />
        {{/if}}
        {{#if isError}}
          <label
            for='repetePassword'
            class='input-label input-label_error text-style_color_red '>Пароли не совпадают
          </label>
        {{/if}}
      </div>
    `
  }
}
