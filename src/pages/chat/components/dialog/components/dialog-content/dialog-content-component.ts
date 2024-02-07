import Block from '../../../../../../core/block'
import DialogDateComponent from '../dialog-date/dialog-date-component'

interface IProps {
  isEmpty: boolean
}

export default class DialogContentComponent extends Block {
  constructor(props: IProps) {
    super('section', {
      ...props,
      dialogDate: new DialogDateComponent({
        date: '19 июня',
      }),
    })
  }

  render() {
    return `
    <section class='dialog-content'>
      {{#if isEmpty}}
        <p
          class='dialog__empty-cation text-style text-style_color_gray text-style_size_12'
        >Выберите чат чтобы отправить сообщение</p>
      {{/if}}
    </section>
    `
  }
}
