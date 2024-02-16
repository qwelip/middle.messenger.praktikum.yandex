import Block from '../../core/block'

interface IButtonStringComponent {
  caption: string
  isRed: boolean
  onClick?: () => void
}

export default class ButtonStringComponent extends Block {
  constructor(props: IButtonStringComponent) {
    super('a', {
      ...props,
      events: {
        click: () => props.onClick?.(),
      },
    })
  }

  render() {
    return `
      {{#if isRed}}
        <a data-setevent class='button-string button-string_color_red'>
          {{caption}}
        </a>
      {{else}}
        <a data-setevent class='button-string'>
          {{caption}}
        </a>
      {{/if}}
    `
  }
}
