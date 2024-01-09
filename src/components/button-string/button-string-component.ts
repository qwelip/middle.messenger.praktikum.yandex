import Block from '../../core/block'

interface IButtonStringComponent {
  caption: string
  page: string
  isRed: boolean
  onClick: () => void
}

export default class ButtonStringComponent extends Block {
  constructor(props: IButtonStringComponent) {
    super('a', {
      ...props,
      events: {
        click: () => props.onClick(),
      },
    })
  }

  render() {
    return `
      {{#if isRed}}
        <a class='button-string button-string_color_red' page={{page}}>
          {{caption}}
        </a>
      {{else}}
        <a class='button-string' page={{page}}>
          {{caption}}
        </a>
      {{/if}}
    `
  }
}
