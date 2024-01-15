import Block from '../../../../../../core/block'

interface IProps {
  sendIcon: string
  onClick: () => void
}

export default class SendButtonComponent extends Block {
  constructor(props: IProps) {
    super('div', {
      ...props,
      events: {
        click: (e) => {
          e.preventDefault()
          props.onClick()
        },
      },
    })
  }

  render() {
    return `
      <a data-setevent class='dialog-sender__send-btn btn-styles'>
        <img class='dialog-sender__send-img' src={{sendIcon}} alt='Отправить' />
      </a>
    `
  }
}
