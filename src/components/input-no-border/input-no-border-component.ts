import Block from '../../core/block'

interface IProps {
  name: string
  type: string
  inputValue: string
  errorMsg: string
  onInput?: (val: string) => void
  validateFn?: (val: string) => boolean
}

export default class InputNoBorderComponent extends Block {
  constructor(props: IProps) {
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
            class='input-no-border text-style text-style_color_red'
            name={{name}}
            type={{type}}
            value='{{inputValue}}'
          />
        {{else}}
          <input
            data-setevent
            class='input-no-border text-style text-style_color_gray'
            name={{name}}
            type={{type}}
            value='{{inputValue}}'
          />
        {{/if}}
        {{#if isError}}
          <label
            for={{name}}
            class='input-label input-label_error text-style_color_red input-label_align_end'>{{errorMsg}}
          </label>
        {{/if}}
      </div>
    `
  }
}
