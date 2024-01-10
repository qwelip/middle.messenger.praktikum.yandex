import Block from '../../core/block'

interface IInputComponent {
  name: string
  type: string
  inputValue: string // todom возможно лишний
  isError?: boolean // todom возможно лишний
  errorMsg?: string
  onInput?: (val: string) => void
  validateFn: (val: string) => boolean
}

export default class InputComponent extends Block {
  constructor(props: IInputComponent) {
    super('input', {
      ...props,
      events: {
        blur: (ev: any) => {
          this.setProps({ inputValue: ev.target.value })
          if (
            ev.target.value.length > 0 &&
            props.validateFn &&
            !props.validateFn(ev.target.value)
          ) {
            this.setProps({ isError: true })
          } else {
            this.setProps({ isError: false })
          }
        },
      },
    })
  }

  // dispatchComponentDidMount() {
  //   this.setProps({ value: '1123' })
  //   this.setProps({ value: '' })
  // }

  render() {
    return `
      <div>
        {{#if isError}}
          <input
            name={{name}}
            id={{name}}
            type={{type}}
            class='input text-style text-style_color_red'
            value={{inputValue}}
          />
        {{else}}
          <input
            name={{name}}
            id={{name}}
            type={{type}}
            class='input text-style'
            value={{inputValue}}
          />
        {{/if}}
        {{#if isError}}
          <label
            for={{name}}
            class='input-label input-label_error text-style_color_red'>Неправильное значение</label>
        {{/if}}
      </div>
    `
  }
}
