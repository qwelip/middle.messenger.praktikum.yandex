import Block from '../../core/block'

interface IInputComponent {
  name: string
  type: string
  isError?: boolean
  errorMsg?: string
  placeholder?: string
  onInput?: (val: string) => void
  validateFn?: (val: string) => boolean
}

export default class InputComponent extends Block {
  constructor(props: IInputComponent) {
    super('div', {
      ...props,
      events: {
        blur: (ev) => {
          const element = ev.target as HTMLInputElement
          this.setProps({ inputValue: element.value })
          if (element.value.length > 0 && props.validateFn) {
            if (props.validateFn(element.value)) {
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
            name={{name}}
            type={{type}}
            class='input text-style text-style_color_red'
            value='{{inputValue}}'
            placeholder='{{placeholder}}'
          />
        {{else}}
          <input
            data-setevent
            name={{name}}
            type={{type}}
            class='input text-style'
            value='{{inputValue}}'
            placeholder='{{placeholder}}'
          />
        {{/if}}
        {{#if isError}}
          <label
            for={{name}}
            class='input-label input-label_error text-style_color_red'>{{errorMsg}}</label>
        {{/if}}
      </div>
    `
  }
}
