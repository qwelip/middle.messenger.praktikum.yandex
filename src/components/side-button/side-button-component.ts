import Block from '../../core/block'

interface IProps {
  goBackIcon: string
  onClick: () => void
}

export default class SideButtonComponent extends Block {
  constructor(props: IProps) {
    super('main', {
      ...props,
      events: {
        click: () => {
          props.onClick()
        },
      },
    })
  }

  render() {
    return `
    <a data-setevent class='side-button'>
      <img
        class='side-button__img'
        src={{goBackIcon}}
        alt='Иконка назад'
      />
    </a>
    `
  }
}
