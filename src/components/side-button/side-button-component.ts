import Block from '../../core/block'

interface IProps {
  page: string
  goBackIcon: string
}

export default class SideButtonComponent extends Block {
  constructor(props: IProps) {
    super('main', {
      ...props,
    })
  }

  render() {
    return `
    <a class='side-button' page={{page}}>
      <img
        class='side-button__img'
        src={{goBackIcon}}
        alt='Иконка назад'
        page={{page}}
      />
    </a>
    `
  }
}
